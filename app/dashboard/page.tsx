import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";
import MealCard from "@/components/cards/mealCard";
import BottomNavMobile from "@/components/navs/bottomNavMobile";
import { getMealPlanForCurrentWeek } from "../actions";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { IDayMeal, IDaysOfTheWeek } from "@/components/cards/types";
import React from "react";
import DayCard from "@/components/cards/dayCard";
import ShoppingListExpandable from "@/components/cards/shoppingListExpandable";
import Link from "next/link";

export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = auth();
  const currentPlan = userId
    ? await getMealPlanForCurrentWeek(userId)
    : undefined;

  const todayWeekDay = format(new Date(), "eeee").toLowerCase();
  const todayMealPlans =
    currentPlan && currentPlan[0]
      ? currentPlan[0].meals &&
        currentPlan[0].meals[todayWeekDay as IDaysOfTheWeek]
      : undefined;

  const today = new Date();

  console.log(currentPlan && currentPlan[0]);
  return (
    <main className="flex min-h-dvh flex-col items-center relative bg-neutral-50 dark:bg-black">
      <SignedIn>
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-4 md:px-10">
          <TopBarDesktop subpage={"Add weekly plan"} />
          <div className="w-full flex p-2">
            <SideNavDesktop activeRoute="dashboard" />
            <BottomNavMobile activeRoute="dashboard" />
            <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24">
              <div className="flex justify-center items-center flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-6 md:pl-6 ">
                  {currentPlan && currentPlan[0] ? (
                    <div className="rounded-lg py-8 px-6 md:px-12 shadow-lg bg-white dark:bg-zinc-800">
                      <h1 className="font-raleway_semibold text-[24px] lg:text-[28px] uppercase">
                        Today - {format(today, "d MMM yyyy")}
                      </h1>
                      <div className="flex flex-col gap-6 pt-4 pb-6">
                        {todayMealPlans
                          ? Object.entries(todayMealPlans).map(
                              ([key, value], i) =>
                                value ? (
                                  <React.Fragment key={`meal_card_${i}`}>
                                    <MealCard
                                      meal={{
                                        ...value,
                                        variant: key as IDayMeal,
                                      }}
                                    />
                                  </React.Fragment>
                                ) : null
                            )
                          : null}
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <h1 className="font-raleway_semibold text-[24px] lg:text-[28px] uppercase pb-2">
                      This week
                    </h1>
                    {currentPlan &&
                    currentPlan[0] &&
                    currentPlan[0].shopping_list ? (
                      <ShoppingListExpandable plan={currentPlan[0]} />
                    ) : null}
                    {currentPlan && currentPlan[0] ? (
                      <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-4 pt-4 pb-6">
                        {currentPlan && currentPlan[0]
                          ? Object.entries(currentPlan[0].meals).map(
                              ([key, value], i) => {
                                return (
                                  <React.Fragment key={`day_${key}_${i}`}>
                                    <DayCard
                                      planid={currentPlan[0].id}
                                      dayOfTheWeek={key as IDaysOfTheWeek}
                                      meals={value}
                                    />
                                  </React.Fragment>
                                );
                              }
                            )
                          : null}
                      </div>
                    ) : (
                      <Link
                        href={"/plans"}
                        className="flex justify-center items-center px-4 py-2 h-full w-full rounded-lg border border-primary bg-lime-50 text-black dark:text-black text-sm font-raleway"
                      >
                        Assign a plan for this week
                      </Link>
                    )}
                  </div>
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
                className={`bg-primary dark:bg-[#434b15]  rounded-md px-[16px] py-[12px] flex justify-center items-center gap-4 w-full shadow-lg`}
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
