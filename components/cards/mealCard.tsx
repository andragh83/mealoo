import Image from "next/image";
import LinkButton from "../buttons/linkButton";
import recipeIcon from "../icons/pngs/recipe.png";
import { IMeal } from "./types";
import MealLineWithIcon from "./cardElements/mealLineWithIcon";
import { dayIcons, mealIcons } from "./cardElements/cardIcons";

export default function MealCard({
  meal: { variant, recipe_name, prep_time, cooking_time, cost, kcal, url },
}: {
  meal: IMeal;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-[16px]">
      <div
        className={`w-full md:w-[200px] md:min-w-[200px] md:min-h-[200px] py-4 h-full flex flex-col items-center justify-center gap-[10px] rounded-lg ${
          variant === "lunch"
            ? `bg-lunch`
            : variant === "breakfast"
            ? `bg-breakfast`
            : `bg-dinner`
        }`}
      >
        <p className="font-raleway text-[20px] uppercase dark:text-black">
          {variant}
        </p>
        <div className="hidden md:block">
          <Image
            src={dayIcons[variant]}
            width={100}
            height={100}
            alt={variant}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[16px] bg-white dark:bg-zinc-800 shadow-md md:shadow-none md:bg-transparent py-2 px-4 md:px-0">
        <span className="font-raleway text-[18px]">{recipe_name}</span>
        <div className="flex flex-col md:gap-[4px]">
          <MealLineWithIcon variant="prep_time" detail={`${prep_time}`} />
          <MealLineWithIcon variant="cooking_time" detail={`${cooking_time}`} />
          <MealLineWithIcon variant="cost" detail={`${cost}`} />
          <MealLineWithIcon variant="kcal" detail={`${kcal}`} />
        </div>
        {url ? (
          <LinkButton
            text="See recipe"
            url={url}
            extraBtnStyle="!bg-primary"
            extraBtnTextStyle="dark:text-black"
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
