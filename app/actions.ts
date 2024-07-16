"use server";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import {
  IDayPlan,
  IDaysOfTheWeek,
  IMeal,
  IWeekPlan,
} from "@/components/cards/types";
import convertWeekPlanToUI, {
  convertCurrentWeekPlanToUI,
} from "@/helpers/convertMealPlanToUi";
import { inngest } from "@/inngest/client";
import { prisma } from "@/prisma/client";
import { endOfWeek, startOfWeek } from "date-fns";
import OpenAI from "openai";

// create a weekly meal plan
export async function createWeekMealPlan({
  userid,
  days,
  planName,
}: {
  userid: string;
  days?: { dayOfTheWeek: IDaysOfTheWeek; dayMeals: IDayPlan };
  planName?: string;
}) {
  let data: any = { user: userid };

  if (planName) {
    data.name = planName;
  }

  if (
    days &&
    days.dayOfTheWeek &&
    days.dayMeals.breakfast &&
    days.dayMeals.lunch &&
    days.dayMeals.dinner
  ) {
    data.days = {
      create: {
        name: days.dayOfTheWeek,
        meals: {
          create: [
            {
              type: "breakfast",
              meal: {
                create: days.dayMeals.breakfast,
              },
            },
            {
              type: "lunch",
              meal: {
                create: days.dayMeals.lunch,
              },
            },
            {
              type: "dinner",
              meal: {
                create: days.dayMeals.dinner,
              },
            },
          ],
        },
      },
    };
  }

  return await prisma.mealPlan.create({
    data: data,
  });
}

export async function createMessage(message: string, userId: string) {
  "use server";
  if (!userId) {
    throw new Error("You must be signed in to create messages!");
  }
  const createdMessage = await prisma.messages.create({
    data: { text: message, author: userId },
  });

  const messageCount = await prisma.messages.count({
    where: {
      author: userId,
    },
  });

  if (messageCount > 20) {
    return { error: "You have exhausted your 20 messages included" };
  } else {
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
                    "cost": number in GBP
                    "kcal": number as kcal
                  }
                }. Suggest a meal plan for a day containing breakfast, lunch and dinner, as follows:`,
          },
          { role: "user", content: message },
        ],
        model: "gpt-3.5-turbo",
      });

      const aiMessage = completion.choices[0]?.message.content
        ? completion.choices[0]?.message.content
        : undefined;

      if (aiMessage) {
        await prisma.messages.update({
          where: { xata_id: createdMessage.xata_id },
          data: { ai_reply: aiMessage },
        });

        return aiMessage;
      } else {
        throw new Error("Unexpected OpenAI response");
      }
    } else {
      return {
        error: "Add OPENAI_API_KEY environment variable to get AI responses.",
      };
    }
  }
}

// add meals to plan
async function upsertMeal({
  dayMeal,
  dayToUpdateId,
}: {
  dayMeal: IMeal;
  dayToUpdateId: string;
}) {
  let mealToUpdate = {
    recipe_name: dayMeal.recipe_name,
    prep_time: dayMeal.prep_time,
    cooking_time: dayMeal.cooking_time,
    cost: dayMeal.cost,
    kcal: dayMeal.kcal,
  };

  const existingMeal = await prisma.dayMeals.findFirst({
    where: {
      dayId: dayToUpdateId,
      type: dayMeal.variant,
    },
  });

  if (existingMeal) {
    await prisma.meals.update({
      where: { xata_id: existingMeal.mealId },
      data: mealToUpdate,
    });
  } else {
    const newMeal = await prisma.meals.create({
      data: mealToUpdate,
    });
    await prisma.dayMeals.create({
      data: {
        type: dayMeal.variant,
        day: { connect: { xata_id: dayToUpdateId } },
        meal: { connect: { xata_id: newMeal.xata_id } },
      },
    });
  }
}

// update a meal plan
export async function updateMealPlan({
  userId,
  planid,
  days,
  planName,
}: {
  userId: string;
  planid: string;
  days?: { dayOfTheWeek: IDaysOfTheWeek; dayMeals: IDayPlan };
  planName?: string;
}) {
  // Find the meal plan by name
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { xata_id: planid, user: userId },
    include: { days: true },
  });

  if (!mealPlan) {
    const mealPlanWithoutDays = await prisma.mealPlan.findFirst({
      where: { xata_id: planid },
    });

    if (!mealPlanWithoutDays) {
      throw new Error("Plan not found");
    } else {
      let data: { name?: string; days?: any } = {};

      if (planName) {
        data.name = planName;
      }

      if (
        days &&
        days.dayOfTheWeek &&
        days.dayMeals.breakfast &&
        days.dayMeals.lunch &&
        days.dayMeals.dinner
      ) {
        data.days = {
          create: {
            name: days.dayOfTheWeek,
            meals: {
              create: [
                {
                  type: "breakfast",
                  meal: {
                    create: days.dayMeals.breakfast,
                  },
                },
                {
                  type: "lunch",
                  meal: {
                    create: days.dayMeals.lunch,
                  },
                },
                {
                  type: "dinner",
                  meal: {
                    create: days.dayMeals.dinner,
                  },
                },
              ],
            },
          },
        };
      }

      await prisma.mealPlan.update({
        where: { xata_id: planid },
        data: data,
      });
    }
  } else {
    if (planName) {
      await prisma.mealPlan.update({
        where: { xata_id: planid },
        data: { name: planName },
      });
    }

    // Find the Monday day entry in the meal plan
    let dayToUpdate = mealPlan.days.find(
      (day) => day.name === days?.dayOfTheWeek
    );

    // If Monday does not exist, create it
    if (!dayToUpdate && days?.dayOfTheWeek) {
      dayToUpdate = await prisma.daysOfTheWeek.create({
        data: {
          name: days?.dayOfTheWeek,
          mealPlan: { connect: { xata_id: mealPlan.xata_id } },
        },
      });
    }

    // Helper function to create or update a meal

    // Upsert meals
    if (days?.dayMeals && dayToUpdate) {
      Object.values(days?.dayMeals).forEach(async (meal) => {
        meal &&
          (await upsertMeal({
            dayMeal: meal,
            dayToUpdateId: dayToUpdate?.xata_id,
          }));
      });
    }
  }
  return { response: "ok" };
}

// get a week plan
export async function getMealPlan(userId: string, planid: string) {
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { xata_id: planid, user: userId },
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
    throw new Error(`Meal Plan not found.`);
  }

  const convertedPlan = convertWeekPlanToUI(mealPlan);

  return convertedPlan;
}

//delete a plan

export async function deleteMealPlan({
  userId,
  planid,
}: {
  userId: string;
  planid: string;
}) {
  // Find the meal plan by name
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { xata_id: planid, user: userId },
  });

  if (!mealPlan) {
    throw new Error("Meal Plan not found.");
  } else {
    await prisma.mealPlan.delete({
      where: { xata_id: planid },
    });
    return { response: "ok" };
  }
}

export async function getAllMealPlans(userid: string) {
  const mealPlans = await prisma.mealPlan.findMany({
    where: { user: userid },
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

  let convertedPlans = mealPlans.map((mealPlan) => {
    return convertWeekPlanToUI(mealPlan);
  });

  return convertedPlans;
}

export async function getMealPlanForCurrentWeek(userId: string) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const currentWeek = await prisma.week.findFirst({
    where: {
      startDate: {
        lte: weekEnd,
      },
      endDate: {
        gte: weekStart,
      },
    },
    include: {
      mealPlans: {
        where: {
          mealPlan: {
            user: userId,
          },
        },
        include: {
          mealPlan: {
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
          },
        },
      },
    },
  });

  if (!currentWeek) {
    throw new Error("No meal plans found for the current week.");
  }

  const convertedPlan = currentWeek.mealPlans.map((weekMealPlan) =>
    convertCurrentWeekPlanToUI(weekMealPlan)
  );

  return convertedPlan;
}

export async function assignMealPlanToWeek(
  userId: string,
  mealPlan: IWeekPlan,
  weekStart: Date,
  weekEnd: Date
) {
  // const today = new Date();
  // const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Assuming the week starts on Monday
  // const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  // Find or create the current week
  let currentWeek = await prisma.week.findFirst({
    where: {
      startDate: {
        lte: weekEnd,
      },
      endDate: {
        gte: weekStart,
      },
    },
  });

  if (!currentWeek) {
    currentWeek = await prisma.week.create({
      data: {
        startDate: weekStart,
        endDate: weekEnd,
      },
    });
  }

  // Assign the meal plan to the current week
  await prisma.weekMealPlan.upsert({
    where: {
      weekId_mealPlanId: {
        weekId: currentWeek.xata_id,
        mealPlanId: mealPlan.id,
      },
    },
    update: {},
    create: {
      weekId: currentWeek.xata_id,
      mealPlanId: mealPlan.id,
    },
  });

  if (mealPlan.shopping_list === undefined) {
    await inngest.send({
      name: "ai_generate_shopping_list",
      data: {
        plan: mealPlan,
      },
    });
  }

  return { response: "ok" };
}
