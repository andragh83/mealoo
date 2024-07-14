"use client";
import { useState } from "react";
import MealCardSmall from "../cards/mealCardSmall";
import { IDayMeal, IDayPlan, IDaysOfTheWeek } from "../cards/types";

export default function AiIdeasForm({
  meals,
  daySelected,
  regenerate,
}: {
  meals: IDayPlan;
  daySelected?: IDaysOfTheWeek;
  regenerate: any;
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-raleway">
        What do you think about these? If you like them hit Save, or you can
        just try again. Careful though, there is a maximum of 50 times you can
        generate day plans on the free tier.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(meals).map(([key, value], i) => {
          return value ? (
            <MealCardSmall meal={{ ...value, variant: key as IDayMeal }} />
          ) : null;
        })}
        <button
          className="h-full w-full rounded-lg border border-primary bg-lime-50"
          onClick={regenerate}
        >
          <span className="text-sm font-raleway text-lime-800">Try again</span>
        </button>
      </div>
      <button
        disabled={!daySelected}
        className={`button group capitalize inline-flex whitespace-nowrap items-center justify-center gap-0.5 rounded-md font-medium tracking-tight transition-all text-sm px-6 py-2.5 text-black bg-primary hover:bg-primary ${
          !daySelected ? "opacity-50" : ""
        }`}
      >
        {daySelected ? `Save for ${daySelected}` : "Save"}
      </button>
    </div>
  );
}
