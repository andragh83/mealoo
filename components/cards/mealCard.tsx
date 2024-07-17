import Image from "next/image";
import LinkButton from "../buttons/linkButton";
import recipeIcon from "../icons/pngs/recipe.png";
import { IMeal } from "./types";
import MealLineWithIcon from "./cardElements/mealLineWithIcon";
import { dayIcons } from "./cardElements/cardIcons";

export default function MealCard({
  meal: { variant, recipe_name, prep_time, cooking_time, cost, kcal, url },
}: {
  meal: IMeal;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-[16px] ">
      <div
        className={`w-full lg:w-[200px] lg:min-w-[200px] lg:min-h-[200px] py-4 h-full flex flex-col items-center justify-center gap-[10px] rounded-lg ${
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
        <div className="hidden lg:block">
          <Image
            src={dayIcons[variant]}
            width={100}
            height={100}
            alt={variant}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[16px] bg-white dark:bg-zinc-800 shadow-md lg:shadow-none lg:bg-transparent py-2 px-4 lg:px-0">
        <span className="font-raleway text-[18px]">{recipe_name}</span>
        <div className="flex flex-col gap-2 lg:gap-[4px] pb-2 lg:pb-0">
          <MealLineWithIcon
            variant="prep_time"
            detail={`${prep_time}`}
            unit={"min"}
          />
          <MealLineWithIcon
            variant="cooking_time"
            detail={`${cooking_time}`}
            unit={"min"}
          />
          <MealLineWithIcon variant="cost" detail={`${cost}`} unit={"GBP"} />
          <MealLineWithIcon variant="kcal" detail={`${kcal}`} unit={"kcal"} />
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
