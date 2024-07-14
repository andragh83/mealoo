"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { IDayPlan, IDaysOfTheWeek, IWeekPlan } from "../cards/types";
import TextInput from "../inputs/textInput";

const weekdays: { id: IDaysOfTheWeek; txt: string }[] = [
  { id: "monday", txt: "MO" },
  { id: "tuesday", txt: "TU" },
  { id: "wednesday", txt: "WE" },
  { id: "thursday", txt: "THU" },
  { id: "friday", txt: "FR" },
  { id: "saturday", txt: "SA" },
  { id: "sunday", txt: "SU" },
];

export default function PlanNameForm({
  currentMealPlan,
  updateMealPlanName,
}: {
  currentMealPlan: IWeekPlan | undefined;
  updateMealPlanName?: any;
}) {
  const [sending, setSending] = useState<boolean>(false);
  const [name, setName] = useState(currentMealPlan ? currentMealPlan.name : "");

  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (e: any) => {
    setSending(true);
    let response = await updateMealPlanName({}, userId);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <TextInput
          name="plan_name"
          value={name}
          onChange={setName}
          placeholder="Name your weekly meal plan"
        />
        <button
          type="submit"
          disabled={sending}
          className={`button group inline-flex whitespace-nowrap items-center justify-center gap-0.5 rounded-md font-medium tracking-tight transition-all text-sm px-6 py-2.5 text-black bg-primary hover:bg-primary ${
            sending ? "opacity-50" : ""
          }`}
        >
          {sending ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  );
}
