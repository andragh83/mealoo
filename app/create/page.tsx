import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import GenerateIdesForm from "../../components/forms/generateIdeasForm";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";
import WeekSection from "@/components/sections/weekSection";
import { IDaysOfTheWeek } from "@/components/cards/types";
import {
  updateMealPlan,
  createMessage,
  createWeekMealPlan,
  getMealPlan,
} from "../actions";
import BottomNavMobile from "@/components/navs/bottomNavMobile";
import { auth } from "@clerk/nextjs/server";

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

  const plan_id =
    searchParams.plan_id &&
    (typeof searchParams.plan_id === "string"
      ? searchParams.plan_id
      : searchParams.plan_id[0]);

  const { userId } = auth();

  const currentMealPlan =
    plan_id && userId ? await getMealPlan(userId, plan_id) : undefined;

  return (
    <main className="flex min-h-dvh flex-col items-center relative bg-neutral-50 dark:bg-black">
      <SignedIn>
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-4 lg:px-10">
          <TopBarDesktop subpage={"Add weekly plan"} />

          <div className="w-full flex p-2">
            <SideNavDesktop activeRoute="create" />
            <BottomNavMobile activeRoute="create" />
            <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24 md:pl-8">
              <div className="flex justify-center items-center flex-col gap-6 w-full">
                <div className="flex flex-col-reverse gap-10 lg:flex-row">
                  <WeekSection
                    currentWeekMealPlan={currentMealPlan}
                    activeWeekDay={active_weekday as IDaysOfTheWeek}
                    updateMealPlan={updateMealPlan}
                    createWeekMealPlan={createWeekMealPlan}
                  />
                  <GenerateIdesForm
                    activeWeekDay={active_weekday as IDaysOfTheWeek}
                    createMessage={createMessage}
                    createWeekMealPlan={createWeekMealPlan}
                    currentWeekMealPlan={currentMealPlan}
                    updateMealPlan={updateMealPlan}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-10">
          <SignedIn>
            <TopBarDesktop />
          </SignedIn>
          <div className="w-full min-h-dvh flex justify-center items-center flex-col gap-6 pb-24">
            <div className="flex justify-center items-center flex-col gap-8">
              <div>
                <h2 className="font-righteous text-[#8AA100] text-[48px] sm:text-[64px] md:text-[76px] text-center">
                  MeaLoo
                </h2>
                <p className="font-raleway text-center text-[22px]">
                  Stress free meal planning
                </p>
              </div>
              <div
                className={`bg-primary dark:bg-[#434b15]  rounded-md px-[12px] py-[12px] flex justify-center items-center gap-4 shadow-lg`}
              >
                <SignInButton />
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </main>
  );
}
