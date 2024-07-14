export type IDayMeal = "breakfast" | "lunch" | "dinner";

export type IMeal = {
  variant: IDayMeal;
  recipe_name: string;
  prep_time: number;
  cooking_time: number;
  cost: number;
  calories: number;
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

export type IRecipeDetail = "prep_time" | "cooking_time" | "cost" | "calories";

export type IDayPlan = {
  [key in IDayMeal]: IMeal | undefined;
};

export type IWeekPlanMeals = {
  [key in IDaysOfTheWeek]: { [key in IDayMeal]: IMeal | undefined };
};
export type IWeekPlan = {
  id: string;
  name: string;
  meals: IWeekPlanMeals;
};
