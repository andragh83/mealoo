"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { IDayMeal, IDayPlan, IDaysOfTheWeek } from "../cards/types";
import MealCardPlaceholder from "../cards/mealCardPlaceholder";
import React from "react";

const weekdays: { id: IDaysOfTheWeek; txt: string }[] = [
  { id: "monday", txt: "MO" },
  { id: "tuesday", txt: "TU" },
  { id: "wednesday", txt: "WE" },
  { id: "thursday", txt: "THU" },
  { id: "friday", txt: "FR" },
  { id: "saturday", txt: "SA" },
  { id: "sunday", txt: "SU" },
];

export default function DayForm({
  dayAssigned,
  currentMealPlan,
  createDayMealPlan,
}: {
  dayAssigned: IDaysOfTheWeek;
  currentMealPlan: IDayPlan | undefined;
  createDayMealPlan?: any;
}) {
  const [sending, setSending] = useState<boolean>(false);

  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (e: any) => {
    setSending(true);
    let response = await createDayMealPlan({}, userId);
  };

  const plan = currentMealPlan ?? {
    breakfast: undefined,
    lunch: undefined,
    dinner: undefined,
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full bg-white dark:bg-zinc-800 p-6 flex flex-col gap-6"
      >
        {Object.entries(plan).map(([key, _], i) => {
          return (
            <React.Fragment key={`day_meal_${i}`}>
              <MealCardPlaceholder variant={key as IDayMeal} />
            </React.Fragment>
          );
        })}
        <button
          type="submit"
          disabled={sending}
          className={`w-full button group inline-flex items-center justify-center gap-0.5 rounded-md font-medium tracking-tight transition-all text-sm px-10 py-2.5 text-black bg-primary hover:bg-primary ${
            sending ? "opacity-50" : ""
          }`}
        >
          {sending ? "Saving..." : `Save for ${dayAssigned}`}
        </button>
      </form>
    </>
  );
}
