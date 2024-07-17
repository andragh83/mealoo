import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";
import {
  assignMealPlanToWeek,
  deleteMealPlan,
  getAllMealPlans,
} from "../actions";
import { auth } from "@clerk/nextjs/server";
import PlanExpandableCard from "@/components/cards/planExpandableCard";
import ChevronRight from "@/components/icons/svgs/chevronRight";
import Link from "next/link";
import BottomNavMobile from "@/components/navs/bottomNavMobile";
import React from "react";

export default async function PlansPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = auth();
  const plans = userId ? await getAllMealPlans(userId) : undefined;

  return (
    <main className="flex min-h-dvh flex-col items-center relative bg-neutral-50 dark:bg-black">
      {" "}
      <SignedIn>
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-4 md:px-10">
          <TopBarDesktop subpage={"Add weekly plan"} />
          <div className="w-full flex p-2">
            <SideNavDesktop activeRoute="plans" />
            <BottomNavMobile activeRoute="plans" />
            <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24">
              <div className="flex justify-center items-center flex-col gap-6 w-full md:px-8">
                <div className="flex flex-col gap-4 w-full">
                  {plans && plans.length > 0 ? (
                    plans?.map((plan, i) => (
                      <React.Fragment key={`plan_card_${i}`}>
                        <PlanExpandableCard
                          plan={plan}
                          deletePlan={deleteMealPlan}
                          assign={assignMealPlanToWeek}
                        />
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="w-full flex items-center flex-col gap-6">
                      <p className="font-raleway text-sm text-zinc-500">
                        {"You haven't created any weekly meal plans yet."}
                      </p>
                      <Link
                        href={"/create"}
                        className="flex justify-center items-center px-10 py-2 h-20 rounded-lg border border-primary bg-lime-50 text-black dark:text-black text-sm font-raleway"
                      >
                        Create a plan
                      </Link>
                    </div>
                  )}
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
