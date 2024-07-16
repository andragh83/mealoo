export type IDayMeal = "breakfast" | "lunch" | "dinner";

export type IMeal = {
  variant: IDayMeal;
  recipe_name: string;
  prep_time: number;
  cooking_time: number;
  cost: number;
  kcal: number;
  url?: string;
};

export type IDaysOfTheWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type IRecipeDetail = "prep_time" | "cooking_time" | "cost" | "kcal";

export type IDayPlan = {
  [key in IDayMeal]: IMeal | undefined;
};

export type IWeekPlanMeals = {
  [key in IDaysOfTheWeek]: { [key in IDayMeal]: IMeal | undefined };
};
export type IWeekPlan = {
  id: string;
  name?: string;
  weeks?: { weekStart: Date; weekEnd: Date }[];
  shopping_list?: string;
  meals: IWeekPlanMeals;
};
