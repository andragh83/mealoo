"use client";
import { IDayPlan, IDaysOfTheWeek, IWeekPlan } from "../cards/types";
import DaySection from "./daySection";
import { usePathname, useRouter } from "next/navigation";
import PlanNameForm from "../forms/nameForm";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import EditPen from "../icons/svgs/editPen";

const weekdays: { id: IDaysOfTheWeek; txt: string }[] = [
  { id: "monday", txt: "MO" },
  { id: "tuesday", txt: "TU" },
  { id: "wednesday", txt: "WE" },
  { id: "thursday", txt: "THU" },
  { id: "friday", txt: "FR" },
  { id: "saturday", txt: "SA" },
  { id: "sunday", txt: "SU" },
];

export default function WeekSection({
  currentWeekMealPlan,
  activeWeekDay,
  updateMealPlan,
  createWeekMealPlan,
}: {
  currentWeekMealPlan?: IWeekPlan;
  activeWeekDay: IDaysOfTheWeek;
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
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sending, setSending] = useState<boolean>(false);

  const { userId } = useAuth();

  const onDayClick = (dayid: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (activeWeekDay !== dayid) {
      if (searchParams.get("message_id")) {
        searchParams.delete("message_id");
      }
    }

    if (searchParams.get("weekday")) {
      searchParams.delete("weekday");
      searchParams.append("weekday", dayid);
    } else {
      searchParams.append("weekday", dayid);
    }

    router.replace(
      `${pathname}${
        searchParams.size > 0 ? `?${searchParams}` : `?weekday=${dayid}`
      }`
    );
  };

  const saveName = async (name: string) => {
    if (currentWeekMealPlan && userId) {
      updateMealPlan({
        userId: userId,
        planid: currentWeekMealPlan.id,
        planName: name,
      });

      setTimeout(() => {
        window.location.reload();
        setSending(false);
      }, 500);
    } else if (userId) {
      const newPlan = await createWeekMealPlan({
        userid: userId,
        planName: name,
      });
      if (newPlan.xata_id) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.append("plan_id", newPlan.xata_id);

        setTimeout(
          () =>
            router.replace(
              `${pathname}${
                searchParams.size > 0
                  ? `?${searchParams}`
                  : `?plan_id=${newPlan.xata_id}`
              }`
            ),
          500
        );
      }
    }
    setSending(false);
  };

  const [isNameEditActive, setIsNameEditActive] = useState(false);

  useEffect(() => {
    if (currentWeekMealPlan?.name) {
      setIsNameEditActive(false);
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-start gap-6 rounded-lg">
        <div className="w-full flex flex-col gap-2 lg:gap-6">
          <h1 className="hidden lg:block font-raleway text-lg uppercase">
            Select a day and let’s cook up some ideas
          </h1>
          {isNameEditActive ||
          !currentWeekMealPlan ||
          !currentWeekMealPlan.name ? (
            <PlanNameForm
              currentMealPlan={
                currentWeekMealPlan ? currentWeekMealPlan : undefined
              }
              updateMealPlanName={(v: string) => {
                setSending(true);
                saveName(v);
              }}
              cancelEdit={
                currentWeekMealPlan?.name
                  ? () => setIsNameEditActive(false)
                  : undefined
              }
              isSending={sending}
            />
          ) : (
            <button
              className="w-auto text-left flex gap-2"
              onClick={() => {
                setIsNameEditActive(true);
              }}
            >
              <span className="font-raleway_semibold text-lg">
                {currentWeekMealPlan.name}
              </span>
              <EditPen colour="#8AA100" size={14} />
            </button>
          )}
        </div>
        <div className="mt-4 w-full flex flex-col">
          <div className="flex items-center">
            {weekdays.map((day, i) => {
              return (
                <button
                  key={`weekday_item_${i}`}
                  onClick={() => onDayClick(day.id)}
                  className={`w-full px-2 py-1 rounded-t-md shadow-md ${
                    activeWeekDay === day.id
                      ? "bg-primary dark:bg-primary dark:text-black"
                      : "bg-white dark:bg-zinc-800"
                  }`}
                >
                  {day.txt}
                </button>
              );
            })}
          </div>
          <DaySection
            currentMealPlan={
              currentWeekMealPlan && currentWeekMealPlan.meals
                ? currentWeekMealPlan.meals[activeWeekDay]
                : undefined
            }
          />
        </div>
      </div>
    </>
  );
}
