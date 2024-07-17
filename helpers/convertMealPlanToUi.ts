import {
  IWeekPlanMeals,
  IDaysOfTheWeek,
  IWeekPlan,
  IMeal,
  IDayMeal,
} from "@/components/cards/types";

export default function convertWeekPlanToUI(plan: any) {
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

  plan?.days?.forEach((day: any) => {
    day.meals.forEach((dayMeal: any) => {
      weeklyPlanMeals[day?.name as IDaysOfTheWeek] = {
        ...weeklyPlanMeals[day?.name as IDaysOfTheWeek],
        [dayMeal.type as IDayMeal]: {
          recipe_name: dayMeal?.meal?.recipe_name,
          prep_time: dayMeal?.meal?.prep_time,
          cooking_time: dayMeal?.meal?.cooking_time,
          cost: dayMeal?.meal?.cost,
          kcal: dayMeal?.meal?.kcal,
        },
      };
    });
  });

  // Structure the output to make it more readable
  const convertedPlan: IWeekPlan = {
    id: plan?.xata_id,
    name: plan?.name ?? undefined,
    weeks: plan?.weeks?.map(
      (weekPlan: { week: { startDate: any; endDate: any } }) => ({
        weekStart: weekPlan.week.startDate,
        weekEnd: weekPlan.week.endDate,
      })
    ),
    shopping_list: plan?.shopping_list,
    meals: weeklyPlanMeals,
  };

  return convertedPlan;
}

export function convertCurrentWeekPlanToUI(plan: any) {
  let meals: IWeekPlanMeals = {
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

  plan.mealPlan.days.forEach((day: any) => {
    day?.meals.forEach((dayMeal: any) => {
      const mealDetail: IMeal = {
        recipe_name: dayMeal?.meal?.recipe_name,
        prep_time: dayMeal?.meal?.prep_time,
        cooking_time: dayMeal?.meal?.cooking_time,
        kcal: dayMeal?.meal?.kcal,
        variant: "breakfast",
        cost: dayMeal?.meal?.kcal,
      };

      switch (day?.name.toLowerCase()) {
        case "monday":
          meals.monday[dayMeal.type as IDayMeal] = mealDetail;
          break;
        case "tuesday":
          meals.tuesday[dayMeal.type as IDayMeal] = mealDetail;
          break;
        case "wednesday":
          meals.wednesday[dayMeal.type as IDayMeal] = mealDetail;
          break;
        case "thursday":
          meals.thursday[dayMeal.type as IDayMeal] = mealDetail;
          break;
        case "friday":
          meals.friday[dayMeal.type as IDayMeal] = mealDetail;
          break;
        case "saturday":
          meals.saturday[dayMeal.type as IDayMeal] = mealDetail;
          break;
        case "sunday":
          meals.sunday[dayMeal.type as IDayMeal] = mealDetail;
          break;
      }
    });
  });

  return {
    id: plan.mealPlan.xata_id,
    name: plan.mealPlan.name,
    weeks: plan.mealPlan.weeks.map((week: any) => ({
      weekStart: week?.week?.startDate,
      weekEnd: week?.week?.endDate,
    })),
    shopping_list: plan?.mealPlan?.shopping_list,
    meals,
  };
}
