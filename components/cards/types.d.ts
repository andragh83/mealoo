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

export type IRecipeDetail = "prep_time" | "cooking_time" | "cost" | "calories";
