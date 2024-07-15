"use client";
import { IDayPlan, IDaysOfTheWeek, IWeekPlan } from "../cards/types";
import DaySection from "./daySection";
import { usePathname, useRouter } from "next/navigation";
import PlanNameForm from "../forms/nameForm";
import { useAuth } from "@clerk/nextjs";

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
  updateMealPlan,
  createWeekMealPlan,
}: {
  currentWeekMealPlan?: IWeekPlan;
  activeWeekDay: IDaysOfTheWeek;
  createWeekMealPlan: (p: {
    userid: string;
    days?: { dayOfTheWeek: IDaysOfTheWeek; dayMeals: IDayPlan };
    planName?: string;
  }) => Promise<{
    name: string | null;
    xata_updatedat: Date;
    xata_id: string;
    xata_version: number;
    xata_createdat: Date;
    user: string | null;
  }>;
  updateMealPlan: (p: {
    planid: string;
    days?: { dayOfTheWeek: IDaysOfTheWeek; dayMeals: IDayPlan };
    planName?: string;
  }) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { userId, isLoaded } = useAuth();

  const onDayClick = (dayid: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (
      currentWeekMealPlan &&
      !currentWeekMealPlan?.meals[activeWeekDay].breakfast?.recipe_name
    ) {
      if (searchParams.get("message_id")) {
        searchParams.delete("message_id");
      }
    }

    if (searchParams.get("weekday")) {
      searchParams.delete("weekday");
      searchParams.append("weekday", dayid);
    } else {
      searchParams.append("weekday", dayid);
    }

    router.replace(
      `${pathname}${
        searchParams.size > 0 ? `?${searchParams}` : `?weekday=${dayid}`
      }`
    );
  };

  const saveName = async (name: string) => {
    if (currentWeekMealPlan) {
      updateMealPlan({ planid: currentWeekMealPlan.id, planName: name });
    } else if (userId) {
      const newPlan = await createWeekMealPlan({
        userid: userId,
        planName: name,
      });
      if (newPlan.xata_id) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.append("plan_id", newPlan.xata_id);

        router.replace(
          `${pathname}${
            searchParams.size > 0
              ? `?${searchParams}`
              : `?plan_id=${newPlan.xata_id}`
          }`
        );
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-start gap-6 rounded-lg">
        <label className="w-full flex flex-col gap-6 font-raleway text-lg uppercase">
          Select a day and let’s cook up some ideas
          <PlanNameForm
            currentMealPlan={
              currentWeekMealPlan ? currentWeekMealPlan : undefined
            }
            updateMealPlanName={(v: string) => {
              saveName(v);
            }}
          />
        </label>
        <div className="mt-4 w-full flex flex-col">
          <div className="flex items-center">
            {weekdays.map((day, i) => {
              return (
                <button
                  key={`weekday_${i}`}
                  onClick={() => onDayClick(day.id)}
                  className={`w-full px-2 py-1 rounded-t-md shadow-md ${
                    activeWeekDay === day.id
                      ? "bg-primary dark:bg-primary"
                      : "bg-white dark:bg-zinc-800"
                  }`}
                >
                  {day.txt}
                </button>
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
