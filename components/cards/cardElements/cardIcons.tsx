import prep_time from "../../icons/pngs/clock.png";
import cooking_time from "../../icons/pngs/cookTime.png";
import cost from "../../icons/pngs/cost.png";
import kcal from "../../icons/pngs/kcal.png";
import breakfast from "../../icons/pngs/breakfast.png";
import lunch from "../../icons/pngs/lunch.png";
import dinner from "../../icons/pngs/dinner.png";
import { StaticImageData } from "next/image";
import { IDayMeal, IRecipeDetail } from "../types";

export const dayIcons: { [key in IDayMeal]: StaticImageData } = {
  breakfast,
  lunch,
  dinner,
};

export const mealIcons: { [key in IRecipeDetail]: StaticImageData } = {
  prep_time,
  cooking_time,
  cost,
  kcal,
};
