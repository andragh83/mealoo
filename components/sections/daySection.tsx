import { IDayMeal, IDayPlan } from "../cards/types";
import MealCardPlaceholder from "../cards/mealCardPlaceholder";
import React from "react";

export default function DaySection({
  currentMealPlan,
}: {
  currentMealPlan: IDayPlan | undefined;
}) {
  const plan = currentMealPlan ?? {
    breakfast: undefined,
    lunch: undefined,
    dinner: undefined,
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-800 p-6 flex flex-col gap-6">
      {Object.entries(plan).map(([key, _], i) => {
        return (
          <React.Fragment key={`day_${i}`}>
            <MealCardPlaceholder variant={key as IDayMeal} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
