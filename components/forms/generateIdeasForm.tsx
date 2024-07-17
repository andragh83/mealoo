"use client";

import { Suspense, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import TextAreaInput from "@/components/inputs/textAreaInput";
import { usePathname, useRouter } from "next/navigation";
import AiIdeasForm from "./aiIdeasForm";
import { IDayPlan, IDaysOfTheWeek, IWeekPlan } from "../cards/types";

export default function GenerateIdeasForm(props: {
  activeWeekDay?: IDaysOfTheWeek;
  currentMessage?: any;
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
    userId: string;
    planid: string;
    days?: { dayOfTheWeek: IDaysOfTheWeek; dayMeals: IDayPlan };
    planName?: string;
  }) => void;
  currentWeekMealPlan?: IWeekPlan;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState<boolean>(false);
  const [aiReply, setAiReply] = useState<string | undefined>(undefined);

  const { userId, isLoaded } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async () => {
    setSending(true);
    let aiReplyFromApi = await props.createMessage(message, userId);
    setAiReply(aiReplyFromApi);
    setSending(false);
  };

  const saveMeals = async (meals: IDayPlan) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (props.currentWeekMealPlan && props.activeWeekDay && meals && userId) {
      setSending(true);
      props.updateMealPlan({
        userId: userId,
        planid: props.currentWeekMealPlan.id,
        days: {
          dayOfTheWeek: props.activeWeekDay,
          dayMeals: meals,
        },
      });
      setSending(false);
    } else if (userId && props.activeWeekDay) {
      setSending(true);
      const newPlan = await props.createWeekMealPlan({
        userid: userId,
        days: {
          dayOfTheWeek: props.activeWeekDay,
          dayMeals: meals,
        },
      });
      setSending(false);
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
        }, 200);
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
        {sending ? "Generating..." : "Ask AI for ideas"}
      </button>
      <Suspense fallback={<div className="w-40 h-40 bg-red-500" />}>
        {aiReply ? (
          <AiIdeasForm
            meals={
              typeof aiReply === "string" ? JSON.parse(aiReply) : undefined
            }
            daySelected={props.activeWeekDay}
            regenerate={onSubmit}
            saveMeals={(meals: IDayPlan) => {
              saveMeals(meals);
            }}
            isSending={sending}
          />
        ) : null}
      </Suspense>
    </div>
  );
}
