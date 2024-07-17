import { inngest } from "./client";
import OpenAI from "openai";
import { IWeekPlan } from "@/components/cards/types";
import convertWeekPlanToUI from "@/helpers/convertMealPlanToUi";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Functions exported from this file are exposed to Inngest
// See: @/app/api/inngest/route.ts

export const generateShoppingList = inngest.createFunction(
  { id: "ai_generate_shopping_list", retries: 1 }, // Each function should have a unique ID
  { event: "app/ai.generate.shopping.list" }, // When an event by this name received, this function will run

  async ({ event, step, prisma }) => {
    // assign plan to a week
    const mealPlan = await prisma.mealPlan.findFirst({
      where: { xata_id: event.data.planid, user: event.data.userid },
      include: {
        days: {
          include: {
            meals: {
              include: {
                meal: true,
              },
            },
          },
        },
        weeks: {
          include: {
            week: true,
          },
        },
      },
    });

    if (!mealPlan) {
      return;
    }

    const convertedPlan = convertWeekPlanToUI(mealPlan);

    // You can execute code that interacts with external services
    // All code is retried automatically on failure
    // Read more about Inngest steps: https://www.inngest.com/docs/learn/inngest-steps
    const reply = await step.run("generate_shopping_list", async () => {
      const mealPlanContents = convertedPlan
        ? Object.values(convertedPlan?.meals).reduce((acc1, meal) => {
            return (
              acc1 +
              `${Object.values(meal).reduce(
                (acc2, meal) =>
                  acc2 + `${meal?.recipe_name ? `${meal?.recipe_name}, ` : ""}`,
                ""
              )}`
            );
          }, "")
        : undefined;

      if (OPENAI_API_KEY && mealPlanContents && mealPlanContents.length > 0) {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Only answer with a json in the following format: {[key: shopping_list_item]: quantity as string}`,
            },
            {
              role: "assistant",
              content: `Generate a shopping list of ingredients to cook the following recipes: ${mealPlanContents}`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        return completion.choices[0]?.message.content
          ? completion.choices[0]?.message.content
          : { error: "Unexpected OpenAI response" };
      } else {
        return {
          error: "Add OPENAI_API_KEY environment variable to get AI responses.",
        };
      }
    });

    await step.run("add-shopping-list-to-mealplan", async () => {
      if (typeof reply === "string") {
        const upresp = await prisma.mealPlan.update({
          where: { xata_id: event.data.planid },
          data: { shopping_list: reply },
        });
      }
    });

    return { event, body: "Ai message OK" };
  }
);
