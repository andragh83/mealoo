import { inngest } from "./client";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Functions exported from this file are exposed to Inngest
// See: @/app/api/inngest/route.ts

export const askAI = inngest.createFunction(
  { id: "ask-ai-for-a-meal-plan-idea", retries: 1 }, // Each function should have a unique ID
  { event: "app/ask.ai" }, // When an event by this name received, this function will run

  async ({ event, step, prisma }) => {
    // Fetch mesage count to see if still eligible
    const messageCount = await prisma.messages.count({
      where: {
        author: event.data.author,
      },
    });

    if (messageCount > 50) {
      return { error: "You have exhausted your 10 messages included" };
    }

    // Fetch data from the database
    const message = await prisma.messages.findUnique({
      where: {
        xata_id: event.data.messageId,
      },
    });

    if (!message) {
      return { error: "Message could not be found" };
    }

    // You can execute code that interacts with external services
    // All code is retried automatically on failure
    // Read more about Inngest steps: https://www.inngest.com/docs/learn/inngest-steps
    const reply = await step.run("create-reply", async () => {
      if (OPENAI_API_KEY) {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Only answer with a json in the following format:
  {
    [key: meal of the day as string]: {
      "recipe_name": string,
      "prep_time": number in minutes,
      "cooking_time": number in minutes,
      "calories": number as kcal
    }
  }. Suggest a meal plan for a day containing breakfast, lunch and dinner, as follows:`,
            },
            { role: "user", content: message?.text },
          ],
          model: "gpt-3.5-turbo",
        });
        return completion.choices[0]?.message.content
          ? JSON.parse(completion.choices[0]?.message.content)
          : { error: "Unexpected OpenAI response" };
      } else {
        // return {
        //   error: "Add OPENAI_API_KEY environment variable to get AI responses.",
        // };
        const dummy_content = `{
  "breakfast": {
    "recipe_name": "Mediterranean Scrambled Eggs",
    "prep_time": 5,
    "cooking_time": 10,
    "calories": 250
  },
  "lunch": {
    "recipe_name": "Asian Chicken Salad",
    "prep_time": 10,
    "cooking_time": 15,
    "calories": 300
  },
  "dinner": {
    "recipe_name": "Grilled Lemon Herb Salmon",
    "prep_time": 5,
    "cooking_time": 15,
    "calories": 350
  }
}`;
        return JSON.parse(dummy_content);
      }
    });

    return { event, body: reply };
  }
);
