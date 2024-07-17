"use client";
import React, { useState } from "react";
import ExpandingWrapper from "../wrappers/expandingWrapper";
import DayCard from "./dayCard";
import { IDaysOfTheWeek, IWeekPlan } from "./types";
import ChevronRight from "../icons/svgs/chevronRight";
import CloseIcon from "../icons/svgs/closeIcon";
import { DatePickerProps, Modal } from "antd";
import { DatePicker } from "antd";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import AddIcon from "../icons/svgs/addIcon";

type Props = {
  plan: IWeekPlan;
  assign: (
    userId: string,
    plan: IWeekPlan,
    weekStart: Date,
    weekEnd: Date
  ) => Promise<{ response: string }>;
  deletePlan: ({ userId, planid }: { userId: string; planid: string }) => void;
};

export default function PlanExpandableCard(props: Props) {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<
    { display: string; weekStart: Date; weekEnd: Date } | undefined
  >(undefined);

  const { plan, deletePlan, assign } = props;
  const [confimrationModal, setConfirmationModal] = useState<
    "deletion" | "assign" | undefined
  >(undefined);

  const numberOfMeals = Object.values(plan.meals).reduce((acc1, meal) => {
    return (
      acc1 +
      Object.values(meal).reduce(
        (acc2, meal) => acc2 + (meal?.recipe_name ? 1 : 0),
        0
      )
    );
  }, 0);

  const handleConfirmationModal = (p: "deletion" | "assign" | undefined) => {
    if (p === "deletion" && userId) {
      deletePlan({ userId: userId, planid: plan.id });
      setConfirmationModal(undefined);
      setTimeout(() => window.location.reload(), 200);
    } else if (p === "assign" && selectedWeek && userId) {
      assign(userId, plan, selectedWeek?.weekStart, selectedWeek?.weekEnd);
      setSelectedWeek(undefined);
      setConfirmationModal(undefined);
      setTimeout(() => window.location.reload(), 200);
    } else {
      setConfirmationModal(undefined);
    }
  };

  const onDateSelect: DatePickerProps["onChange"] = (date, _) => {
    const weekStart = startOfWeek(date.toDate(), { weekStartsOn: 1 }); // Assuming the week starts on Monday
    const weekEnd = endOfWeek(date.toDate(), { weekStartsOn: 1 });
    setSelectedWeek({
      display: `${format(new Date(weekStart), "eeee, d MMM yyyy")} - ${format(
        new Date(weekEnd),
        "eeee, d MMM yyyy"
      )}`,
      weekStart: weekStart,
      weekEnd: weekEnd,
    });
  };

  return (
    <div className="rounded-lg bg-light_pastel_teal dark:bg-zinc-800 flex flex-col py-4 px-4 md:px-8 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="font-raleway text-lg md:text-[20px] text-left">
          {plan.name ?? "Untitled plan"}
        </h1>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setConfirmationModal("assign")}
            className={`w-10 h-10 flex justify-center items-center border rounded-md ${
              numberOfMeals < 21
                ? "border-zinc-300 text-zinc-300 dark:text-zinc-500 dark:border-zinc-500"
                : "border-zinc-300 dark:border-zinc-500"
            }`}
            disabled={numberOfMeals < 21}
          >
            <AddIcon
              colour={
                numberOfMeals < 21
                  ? `fill-zinc-200 dark:fill-zinc-500`
                  : `fill-primary_strong dark:fill-primary_strong`
              }
            />
          </button>

          <button
            onClick={() => setConfirmationModal("deletion")}
            className="w-10 h-10 flex justify-center items-center border border-red-300 dark:border-red-300 rounded-md"
          >
            <CloseIcon size={12} colour={`fill-red-600 dark:fill-red-600`} />
          </button>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="w-10 h-10 flex justify-center items-center border border-zinc-300 dark:border-zinc-500 rounded-md"
          >
            <div
              className={`${isOpen ? "rotate-90 transition" : "transition"}`}
            >
              <ChevronRight />
            </div>
          </button>
        </div>
      </div>

      <Modal
        title={
          confimrationModal === "assign"
            ? `Select week to assign ${plan.name}`
            : `Delete ${plan.name}`
        }
        open={confimrationModal ? true : false}
        onOk={() => handleConfirmationModal(confimrationModal)}
        okText={confimrationModal === "deletion" ? "Delete plan" : "Assign"}
        okButtonProps={
          confimrationModal === "deletion"
            ? { type: "primary", danger: true }
            : { type: "primary", className: "bg-[#8AA100]" }
        }
        onCancel={() => {
          setConfirmationModal(undefined);
          setSelectedWeek(undefined);
        }}
      >
        <p className="font-raleway text-sm text-zinc-400 pb-4">
          {
            "Once you assign a plan to a week, if the plan is for the current week, a shopping list will be generate in your dashboard in a few minutes."
          }
        </p>
        {confimrationModal === "deletion" ? (
          <div className="flex flex-col gap-1">
            <p className="font-raleway text-sm">{`Are you sure you want to delete ${plan.name}?`}</p>
            <p className="font-raleway text-sm">This action is irreversible.</p>
          </div>
        ) : confimrationModal === "assign" ? (
          <div className="flex flex-col gap-3">
            {selectedWeek ? null : (
              <p className="font-raleway text-sm ">
                {"Click on a date and we'll select the corresponding week"}
              </p>
            )}

            <div className="flex items-center gap-4 pt-4">
              <DatePicker onChange={onDateSelect} placeholder="Select week" />
              <strong>{selectedWeek?.display}</strong>
            </div>
            {plan.weeks ? (
              <div className="p-4 bg-pastel_teal rounded-md gap-4 my-4">
                Plan assigned to:
                <ul className="pt-2">
                  {plan.weeks.map((obj, i) => (
                    <li
                      className="text-sm font-raleway_semibold"
                      key={`week_key_${i}`}
                    >{`${format(obj.weekStart, "eeee, d MMM yyyy")} - ${format(
                      obj.weekEnd,
                      "eeee, d MMM yyyy"
                    )}`}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>

      <ExpandingWrapper isOpen={isOpen ?? false}>
        <div className="w-full flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8 pb-6">
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
