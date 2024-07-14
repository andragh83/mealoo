import { IDayMeal, IDayPlan, IDaysOfTheWeek } from "../cards/types";
import MealCardPlaceholder from "../cards/mealCardPlaceholder";

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
      {Object.entries(plan).map(([key, _]) => {
        return <MealCardPlaceholder variant={key as IDayMeal} />;
      })}
    </div>
  );
}
