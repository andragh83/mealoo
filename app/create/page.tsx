import { SignedIn, SignedOut } from "@clerk/nextjs";
import GenerateIdesForm from "../../components/forms/generateIdeasForm";
import { prisma } from "@/prisma/client";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";
import WeekSection from "@/components/sections/weekSection";
import { IDaysOfTheWeek } from "@/components/cards/types";
import {
  updateMealPlan,
  createMessage,
  createWeekMealPlan,
  getAiReplyMessage,
  getMealPlan,
} from "../actions";
import BottomNavMobile from "@/components/navs/bottomNavMobile";

export default async function CreatePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const active_weekday: string | undefined =
    searchParams.weekday &&
    (typeof searchParams.weekday === "string"
      ? searchParams.weekday
      : searchParams.weekday[0]);

  const message_id =
    searchParams.message_id &&
    (typeof searchParams.message_id === "string"
      ? searchParams.message_id
      : searchParams.message_id[0]);

  const plan_id =
    searchParams.plan_id &&
    (typeof searchParams.plan_id === "string"
      ? searchParams.plan_id
      : searchParams.plan_id[0]);

  const currentMessage = message_id
    ? await prisma.aiReplyMessages.findFirst({
        where: {
          messageId: message_id,
        },
        orderBy: {
          xata_createdat: "desc",
        },
      })
    : undefined;

  const aiReply = message_id ? await getAiReplyMessage(message_id) : undefined;
  const currentMealPlan = plan_id ? await getMealPlan(plan_id) : undefined;

  return (
    <main className="flex min-h-dvh flex-col items-center relative bg-neutral-50 dark:bg-black">
      <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-6 lg:px-10">
        <TopBarDesktop subpage={"Add weekly plan"} />

        <div className="w-full flex p-2">
          <SideNavDesktop activeRoute="create" />
          <BottomNavMobile activeRoute="create" />
          <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24 md:pl-8">
            <div className="flex justify-center items-center flex-col gap-6 w-full">
              <SignedIn>
                <div className="flex flex-col-reverse gap-10 lg:flex-row">
                  <WeekSection
                    currentWeekMealPlan={currentMealPlan}
                    activeWeekDay={active_weekday as IDaysOfTheWeek}
                    updateMealPlan={updateMealPlan}
                    createWeekMealPlan={createWeekMealPlan}
                  />
                  <GenerateIdesForm
                    aiReply={{ data: aiReply?.text }}
                    activeWeekDay={active_weekday as IDaysOfTheWeek}
                    currentMessage={currentMessage}
                    createMessage={createMessage}
                    createWeekMealPlan={createWeekMealPlan}
                    currentWeekMealPlan={currentMealPlan}
                    updateMealPlan={updateMealPlan}
                  />
                </div>
              </SignedIn>
              <SignedOut>
                <h1>Sign in to create new messages</h1>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
