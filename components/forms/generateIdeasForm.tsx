"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import TextAreaInput from "@/components/inputs/textAreaInput";
import { usePathname, useRouter } from "next/navigation";
import AiIdeasForm from "./aiIdeasForm";
import { IDayPlan, IDaysOfTheWeek, IWeekPlan } from "../cards/types";

export default function GenerateIdeasForm(props: {
  activeWeekDay?: IDaysOfTheWeek;
  currentMessage?: any;
  aiReply?: { data?: string; error?: string };
  createMessage: any;
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
  currentWeekMealPlan?: IWeekPlan;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState<boolean>(false);

  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async () => {
    setSending(true);
    let message_id = await props.createMessage(message, userId);
    if (message_id) {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("message_id")) {
        searchParams.delete("message_id");
        searchParams.append("message_id", message_id);
      } else {
        searchParams.append("message_id", message_id);
      }
      setTimeout(() => {
        router.push(
          `${pathname}${
            searchParams.size > 0
              ? `?${searchParams}`
              : `?message_id=${message_id}`
          }`
        );
        setSending(false);
      }, 5000);
    }
  };

  const saveMeals = async (meals: IDayPlan) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("message_id")) {
      searchParams.delete("message_id");
    }
    if (props.currentWeekMealPlan && props.activeWeekDay && meals) {
      props.updateMealPlan({
        planid: props.currentWeekMealPlan.id,
        days: {
          dayOfTheWeek: props.activeWeekDay,
          dayMeals: meals,
        },
      });
      setSending(true);
      setTimeout(() => {
        window.location.reload();
        setSending(false);
      }, 5000);
    } else if (userId && props.activeWeekDay) {
      const newPlan = await props.createWeekMealPlan({
        userid: userId,
        days: {
          dayOfTheWeek: props.activeWeekDay,
          dayMeals: meals,
        },
      });
      if (newPlan.xata_id) {
        searchParams.append("plan_id", newPlan.xata_id);

        setTimeout(() => {
          router.replace(
            `${pathname}${
              searchParams.size > 0
                ? `?${searchParams}`
                : `?plan_id=${newPlan.xata_id}`
            }`
          );
          setSending(false);
        }, 5000);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-4 rounded-lg">
      <label className="w-full flex flex-col gap-4 font-raleway text-md">
        Let MeaLoo know your favorite proteins and veggies or whether you’re in
        the mood for healthy eating or comfort food or which type of cuisine you
        are interested in.
        <TextAreaInput
          name="message"
          placeholder="I would like the meals to be high in protein and low in kcal, from international, asian or mediterranean meals and to have low cooking time."
          onChange={(v) => {
            setMessage(v);
          }}
          value={message}
        />
      </label>

      <button
        onClick={onSubmit}
        disabled={sending}
        className={`w-full mb-4 button group inline-flex items-center justify-center gap-0.5 rounded-md font-medium tracking-tight transition-all text-sm px-10 py-2.5 text-black bg-primary hover:bg-primary ${
          sending ? "opacity-50" : ""
        }`}
      >
        {sending ? "Generating..." : "Show me ideas"}
      </button>

      {props.aiReply?.error ? (
        <div>There was an error: {props.aiReply.error}</div>
      ) : props.aiReply?.data ? (
        <AiIdeasForm
          meals={
            typeof props.aiReply?.data === "string"
              ? JSON.parse(props.aiReply.data)
              : undefined
          }
          daySelected={props.activeWeekDay}
          regenerate={onSubmit}
          saveMeals={(meals: IDayPlan) => {
            saveMeals(meals);
          }}
          isSending={sending}
        />
      ) : null}
    </div>
  );
}
