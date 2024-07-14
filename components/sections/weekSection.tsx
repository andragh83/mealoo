"use client";
import { IDaysOfTheWeek, IWeekPlan } from "../cards/types";
import DaySection from "./daySection";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import PlanNameForm from "../forms/nameForm";

const weekdays: { id: IDaysOfTheWeek; txt: string }[] = [
  { id: "monday", txt: "MO" },
  { id: "tuesday", txt: "TU" },
  { id: "wednesday", txt: "WE" },
  { id: "thursday", txt: "THU" },
  { id: "friday", txt: "FR" },
  { id: "saturday", txt: "SA" },
  { id: "sunday", txt: "SU" },
];

export default function WeekSection({
  currentWeekMealPlan,
  activeWeekDay,
  updateMealPlanName,
}: {
  currentWeekMealPlan?: IWeekPlan;
  activeWeekDay: IDaysOfTheWeek;
  updateMealPlanName: any;
}) {
  // const [currentSavedDayPlan, setCurrentSavedDayPlan] = useState<IDayPlan>({
  //   breakfast: undefined,
  //   lunch: undefined,
  //   dinner: undefined,
  // });

  // const emptyWeekPlan: { [key in IDaysOfTheWeek]: IDayPlan } = {
  //   monday: {
  //     breakfast: undefined,
  //     lunch: undefined,
  //     dinner: undefined,
  //   },
  //   tuesday: {
  //     breakfast: undefined,
  //     lunch: undefined,
  //     dinner: undefined,
  //   },
  //   wednesday: {
  //     breakfast: undefined,
  //     lunch: undefined,
  //     dinner: undefined,
  //   },
  //   thursday: {
  //     breakfast: undefined,
  //     lunch: undefined,
  //     dinner: undefined,
  //   },
  //   friday: {
  //     breakfast: undefined,
  //     lunch: undefined,
  //     dinner: undefined,
  //   },
  //   saturday: {
  //     breakfast: undefined,
  //     lunch: undefined,
  //     dinner: undefined,
  //   },
  //   sunday: {
  //     breakfast: undefined,
  //     lunch: undefined,
  //     dinner: undefined,
  //   },
  // };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <div className="w-full flex flex-col items-start gap-6 rounded-lg">
        <label className="w-full flex flex-col gap-6 font-raleway text-lg uppercase">
          Select a day and let’s cook up some ideas
          <PlanNameForm
            currentMealPlan={
              currentWeekMealPlan ? currentWeekMealPlan : undefined
            }
            updateMealPlanName={updateMealPlanName}
          />
        </label>
        <div className="mt-4 w-full flex flex-col">
          <div className="flex items-center">
            {weekdays.map((day) => {
              return (
                <Link
                  href={`${pathname}${
                    searchParams
                      ? `${searchParams}&weekday=${day.id}`
                      : `?weekday=${day.id}`
                  }`}
                  className={`w-full px-2 py-1 rounded-t-md shadow-md ${
                    activeWeekDay === day.id
                      ? "bg-primary dark:bg-primary"
                      : "bg-white dark:bg-zinc-800"
                  }`}
                >
                  {day.txt}
                </Link>
              );
            })}
          </div>
          <DaySection
            currentMealPlan={
              currentWeekMealPlan && currentWeekMealPlan.meals
                ? currentWeekMealPlan.meals[activeWeekDay]
                : undefined
            }
          />
        </div>
      </div>
    </>
  );
}
