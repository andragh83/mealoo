"use server";

import {
  IDayPlan,
  IDaysOfTheWeek,
  IMeal,
  IWeekPlan,
  IWeekPlanMeals,
} from "@/components/cards/types";
import { inngest } from "@/inngest/client";
import { prisma } from "@/prisma/client";

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

  await inngest.send({
    name: "app/ask.ai",
    data: {
      messageId: createdMessage.xata_id,
    },
  });

  return createdMessage.xata_id;
}

export async function getAiReplyMessage(message_id: string) {
  const lastAiReplyMessage = await prisma.aiReplyMessages.findFirst({
    where: {
      messageId: message_id,
    },
    orderBy: {
      xata_createdat: "desc",
    },
  });

  return lastAiReplyMessage;
}

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

export async function updateMealPlan({
  planid,
  days,
  planName,
}: {
  planid: string;
  days?: { dayOfTheWeek: IDaysOfTheWeek; dayMeals: IDayPlan };
  planName?: string;
}) {
  // Find the meal plan by name
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { xata_id: planid },
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
}

export async function getMealPlan(planid: string) {
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { xata_id: planid },
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
    },
  });

  if (!mealPlan) {
    throw new Error(`Meal Plan not found.`);
  }

  let weeklyPlanMeals: IWeekPlanMeals = {
    monday: {
      breakfast: undefined,
      lunch: undefined,
      dinner: undefined,
    },
    tuesday: {
      breakfast: undefined,
      lunch: undefined,
      dinner: undefined,
    },
    wednesday: {
      breakfast: undefined,
      lunch: undefined,
      dinner: undefined,
    },
    thursday: {
      breakfast: undefined,
      lunch: undefined,
      dinner: undefined,
    },
    friday: {
      breakfast: undefined,
      lunch: undefined,
      dinner: undefined,
    },
    saturday: {
      breakfast: undefined,
      lunch: undefined,
      dinner: undefined,
    },
    sunday: {
      breakfast: undefined,
      lunch: undefined,
      dinner: undefined,
    },
  };

  mealPlan.days.forEach((day) => {
    day.meals.forEach((dayMeal) => {
      weeklyPlanMeals[day.name as IDaysOfTheWeek] = {
        ...weeklyPlanMeals[day.name as IDaysOfTheWeek],
        [dayMeal.type]: {
          recipe_name: dayMeal.meal.recipe_name,
          prep_time: dayMeal.meal.prep_time,
          cooking_time: dayMeal.meal.cooking_time,
          cost: dayMeal.meal.cost,
          kcal: dayMeal.meal.kcal,
        },
      };
    });
  });

  // Structure the output to make it more readable
  const structuredPlan: IWeekPlan = {
    id: mealPlan.xata_id,
    name: mealPlan.name ?? undefined,
    meals: weeklyPlanMeals,
  };

  return structuredPlan;
}

export async function deleteMealPlan(planid: string) {
  // Find the meal plan by name
  const mealPlan = await prisma.mealPlan.findFirst({
    where: { xata_id: planid },
  });

  if (!mealPlan) {
    throw new Error("Meal Plan not found.");
  } else {
    await prisma.mealPlan.delete({
      where: { xata_id: planid },
    });
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
    },
  });

  let convertedPlans = mealPlans.map((mealPlan) => {
    let weeklyPlanMeals: IWeekPlanMeals = {
      monday: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      },
      tuesday: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      },
      wednesday: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      },
      thursday: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      },
      friday: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      },
      saturday: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      },
      sunday: {
        breakfast: undefined,
        lunch: undefined,
        dinner: undefined,
      },
    };

    mealPlan.days.forEach((day) => {
      day.meals.forEach((dayMeal) => {
        weeklyPlanMeals[day.name as IDaysOfTheWeek] = {
          ...weeklyPlanMeals[day.name as IDaysOfTheWeek],
          [dayMeal.type]: {
            recipe_name: dayMeal.meal.recipe_name,
            prep_time: dayMeal.meal.prep_time,
            cooking_time: dayMeal.meal.cooking_time,
            cost: dayMeal.meal.cost,
            kcal: dayMeal.meal.kcal,
          },
        };
      });
    });

    // Structure the output to make it more readable
    const structuredPlan: IWeekPlan = {
      id: mealPlan.xata_id,
      name: mealPlan.name ?? undefined,
      meals: weeklyPlanMeals,
    };

    return structuredPlan;
  });

  return convertedPlans;
}
