"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import TextAreaInput from "@/components/inputs/textAreaInput";
import { usePathname, useRouter } from "next/navigation";
import AiIdeasForm from "./aiIdeasForm";
import { IDaysOfTheWeek } from "../cards/types";

export default function GenerateIdeasForm(props: {
  activeWeekDay?: IDaysOfTheWeek;
  currentMessage?: any;
  aiReply?: string;
  createMessage: any;
  createWeekMealPlan: any;
  createDayMealPlan: any;
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
    console.log("regenerate!!");
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
      }, 2000);
      setSending(false);
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
          placeholder="I would like the meals to be high in protein and low in calories, from international, asian or mediterranean meals and to have low cooking time."
          onChange={(v) => {
            setMessage(v);
          }}
          value={message}
        />
      </label>

      {props.aiReply ? (
        <AiIdeasForm
          meals={JSON.parse(props.aiReply)}
          daySelected={props.activeWeekDay}
          regenerate={onSubmit}
        />
      ) : (
        <button
          onClick={onSubmit}
          disabled={sending}
          className={`w-full button group inline-flex items-center justify-center gap-0.5 rounded-md font-medium tracking-tight transition-all text-sm px-10 py-2.5 text-black bg-primary hover:bg-primary ${
            sending ? "opacity-50" : ""
          }`}
        >
          {sending ? "Generating..." : "Show me ideas"}
        </button>
      )}
    </div>
  );
}
