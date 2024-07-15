import Image from "next/image";
import LinkButton from "../buttons/linkButton";
import recipeIcon from "../icons/pngs/recipe.png";
import { IMeal } from "./types";
import MealLineWithIcon from "./cardElements/mealLineWithIcon";

export default function MealCardSmall({
  meal: { variant, recipe_name, prep_time, cooking_time, cost, kcal, url },
}: {
  meal: IMeal;
}) {
  return (
    <div className="flex flex-col gap-2 shadow-md">
      <div
        className={`px-6 py-2 rounded-t-lg ${
          variant === "lunch"
            ? `bg-lunch`
            : variant === "breakfast"
            ? `bg-breakfast`
            : `bg-dinner`
        }`}
      >
        <p className="font-raleway text-[20px] capitalize dark:text-black">
          {variant}
        </p>
      </div>
      <div className="flex flex-col gap-[16px] pt-0 rounded-lg p-6 dark:bg-zinc-800 h-full">
        <div className="py-2 border-b-[1px] border-b-gray-300 flex items-end">
          <span className="font-raleway text-[18px]">{recipe_name}</span>
        </div>
        <div className="flex flex-col gap-[8px]">
          <MealLineWithIcon variant="prep_time" detail={`${prep_time}`} sm />
          <MealLineWithIcon variant="cooking_time" detail={`${cooking_time}`} />
          <MealLineWithIcon variant="cost" detail={`${cost}`} />
          <MealLineWithIcon variant="kcal" detail={`${kcal}`} />
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
