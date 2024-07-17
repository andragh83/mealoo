"use client";
import React, { useState } from "react";
import ExpandingWrapper from "../wrappers/expandingWrapper";
import { IWeekPlan } from "./types";
import ChevronRight from "../icons/svgs/chevronRight";

type Props = {
  plan: IWeekPlan;
};

export default function ShoppingListExpandable(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { plan } = props;

  const shoppingList = plan.shopping_list
    ? JSON.parse(plan.shopping_list)
    : undefined;

  return (
    <div className="rounded-lg bg-light_pastel_teal dark:bg-zinc-800 flex flex-col py-4 px-4 shadow-md">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-between"
      >
        <h1 className="font-raleway text-[20px] text-left">
          See shopping list
        </h1>

        <div className={`${isOpen ? "rotate-90 transition" : "transition"}`}>
          <ChevronRight />
        </div>
      </button>

      <ExpandingWrapper isOpen={isOpen ?? false}>
        <div className="w-full flex flex-wrap gap-4 pt-8 pb-6">
          {Object.entries(shoppingList).map(([key, value], i) => {
            return (
              <React.Fragment key={`item_expense_${key}_${i}`}>
                <div className="flex px-4 py-2 justify-between gap-6 rounded-md shadow-md bg-white dark:bg-zinc-700 dark:text-white">
                  <span className="font-raleway_light text-base"> {key}</span>
                  <span className="font-raleway_semibold text-base">{`${value}`}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </ExpandingWrapper>
    </div>
  );
}
