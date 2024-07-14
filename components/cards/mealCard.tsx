import Image from "next/image";
import breakfast from "../icons/pngs/breakfast.png";
import lunch from "../icons/pngs/lunch.png";
import dinner from "../icons/pngs/dinner.png";
import LinkButton from "../buttons/linkButton";
import recipeIcon from "../icons/pngs/recipe.png";
import { IMeal } from "./types";
import MealLineWithIcon from "./cardElements/mealLineWithIcon";

const images = {
  breakfast,
  lunch,
  dinner,
};

export default function MealCard({
  meal: { variant, recipe_name, prep_time, cooking_time, cost, calories, url },
}: {
  meal: IMeal;
}) {
  return (
    <div className="flex gap-[16px]">
      <div
        className={`w-[200px] flex flex-col items-center justify-center gap-[10px] rounded-lg ${
          variant === "breakfast"
            ? "bg-breakfast"
            : variant === "dinner"
            ? "bg-dinner"
            : "bg-lunch"
        }`}
      >
        <p className="font-raleway text-[20px] uppercase">{variant}</p>
        <Image src={images[variant]} width={100} height={100} alt={variant} />
      </div>
      <div className="flex flex-col gap-[16px] pt-2">
        <span className="font-raleway text-[18px]">{recipe_name}</span>
        <div className="flex flex-col gap-[8px]">
          <MealLineWithIcon variant="prep_time" detail={`${prep_time}`} />
          <MealLineWithIcon variant="cooking_time" detail={`${cooking_time}`} />
          <MealLineWithIcon variant="cost" detail={`${cost}`} />
          <MealLineWithIcon variant="calories" detail={`${calories}`} />
        </div>
        {url ? (
          <LinkButton
            text="See recipe"
            url={url}
            extraBtnStyle="!bg-primary"
            icon={
              <Image
                src={recipeIcon}
                width={24}
                height={24}
                alt="recipe_icon"
              />
            }
          />
        ) : null}
      </div>
    </div>
  );
}
