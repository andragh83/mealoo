"use client";
import React, { useState } from "react";
import ExpandingWrapper from "../wrappers/expandingWrapper";
import DayCard from "./dayCard";
import { IDaysOfTheWeek, IWeekPlan, IWeekPlanMeals } from "./types";
import ChevronRight from "../icons/svgs/chevronRight";

export default function PlanExpandableCard({ plan }: { plan: IWeekPlan }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="round-lg bg-light_pastel_teal dark:bg-zinc-800 flex flex-col py-4 px-8 shadow-md">
      <button
        className="flex items-center justify-between"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <h1 className="font-raleway text-[20px] text-left">{plan.name}</h1>
        <div className={isOpen ? `rotate-90 transition` : "transition"}>
          <ChevronRight colour="fill-[#8AA100]" />
        </div>
      </button>

      <ExpandingWrapper isOpen={isOpen ?? false}>
        <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-4 pt-4 pb-6">
          {Object.entries(plan.meals).map(([key, value], i) => {
            return (
              <React.Fragment key={`day_${key}_${i}`}>
                <DayCard
                  planid={plan.id}
                  dayOfTheWeek={key as IDaysOfTheWeek}
                  meals={value}
                />
              </React.Fragment>
            );
          })}
        </div>
      </ExpandingWrapper>
    </div>
  );
}
