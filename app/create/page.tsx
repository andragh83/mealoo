import { SignedIn, SignedOut } from "@clerk/nextjs";
import GenerateIdesForm from "../../components/forms/generateIdeasForm";
import { prisma } from "@/prisma/client";
import { inngest } from "@/inngest";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";
import WeekSection from "@/components/sections/weekSection";
import { IDaysOfTheWeek } from "@/components/cards/types";

export async function createMessage(message: string, userId: string) {
  "use server";
  if (!userId) {
    throw new Error("You must be signed in to create messages!");
  }
  const createdMessage = await prisma.messages.create({
    data: { text: message, author: userId },
  });

  await inngest.send({
    name: "app/ask.ai",
    data: {
      messageId: createdMessage.xata_id,
    },
  });

  return createdMessage.xata_id;
}

async function getAiReplyMessage(message_id: string) {
  const lastAiReplyMessage = await prisma.aiReplyMessages.findFirst({
    where: {
      messageId: message_id,
    },
    orderBy: {
      xata_createdat: "desc",
    },
  });

  return lastAiReplyMessage;
}

export async function createWeekMealPlan(plan: {}, userId: string) {
  "use server";
  // if (!userId) {
  //   throw new Error("You must be signed in to create messages!");
  // }
  // const createdMessage = await prisma.messages.create({
  //   data: { text: message, author: userId },
  // });
}

export async function createDayMealPlan(plan: {}, userId: string) {
  "use server";
  // if (!userId) {
  //   throw new Error("You must be signed in to create messages!");
  // }
  // const createdMessage = await prisma.messages.create({
  //   data: { text: message, author: userId },
  // });
}

export async function updateMealPlanName(plan: {}, userId: string) {
  "use server";
  // if (!userId) {
  //   throw new Error("You must be signed in to create messages!");
  // }
  // const createdMessage = await prisma.messages.create({
  //   data: { text: message, author: userId },
  // });
}

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

  return (
    <main className="flex min-h-dvh flex-col items-center relative bg-neutral-50 dark:bg-black">
      <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-10">
        <TopBarDesktop subpage={"Add weekly plan"} />
        <div className="w-full flex p-2">
          <SideNavDesktop activeRoute="create" />
          <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24 pl-8">
            <div className="flex justify-center items-center flex-col gap-6 w-full">
              <SignedIn>
                <div className="flex gap-10">
                  <WeekSection
                    currentWeekMealPlan={undefined}
                    activeWeekDay={active_weekday as IDaysOfTheWeek}
                    updateMealPlanName={updateMealPlanName}
                  />
                  <GenerateIdesForm
                    aiReply={aiReply?.text}
                    activeWeekDay={active_weekday as IDaysOfTheWeek}
                    currentMessage={currentMessage}
                    createMessage={createMessage}
                    createWeekMealPlan={createWeekMealPlan}
                    createDayMealPlan={createDayMealPlan}
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
