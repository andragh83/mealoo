"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import TextAreaInput from "@/components/inputs/textAreaInput";

export default function GenerateIdesForm(props: {
  createMessage: any;
  createWeekMealPlan: any;
  createDayMealPlan: any;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState<boolean>(false);
  const [aiReply, setAiReply] = useState<any>(undefined);

  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (e: any) => {
    setSending(true);
    let response = await props.createMessage(message, userId);
    setAiReply(response);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col items-start gap-4 rounded-lg"
      >
        <label className="w-full flex flex-col gap-4 font-raleway text-md">
          Let MelaLoo know your favorite proteins and veggies or whether you’re
          in the mood for healthy eating or comfort food or which type of
          cuisine you are interested in.
          <TextAreaInput
            name="message"
            placeholder="I would like the meals to be high in protein and low in calories, from international, asian or mediterranean meals and to have low cooking time."
            onChange={(v) => {
              setMessage(v);
            }}
            value={message}
          />
        </label>
        <div className="mt-4 w-full flex flex-row items-center justify-center">
          <button
            type="submit"
            disabled={sending}
            className={`w-full button group inline-flex items-center justify-center gap-0.5 rounded-md font-medium tracking-tight transition-all text-sm px-10 py-2.5 text-black bg-primary hover:bg-primary ${
              sending ? "opacity-50" : ""
            }`}
          >
            {sending ? "Generating..." : "Show me ideas"}
          </button>
        </div>
      </form>
    </>
  );
}
