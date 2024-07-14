import { SignedIn, SignedOut } from "@clerk/nextjs";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";
import DayCard from "@/components/cards/dayCard";

export default async function PlansPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center relative dark:bg-black">
      <div className="z-10 w-full max-w-5xl flex flex-col flex-1 px-10">
        <TopBarDesktop subpage={"Add weekly plan"} />
        <div className="w-full flex p-2">
          <SideNavDesktop activeRoute="plans" />
          <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24">
            <div className="flex justify-center items-center flex-col gap-6">
              <SignedIn>
                <DayCard
                  dayOfTheWeek="monday"
                  meals={{
                    breakfast: "Egg White Omelette with Vegetables",
                    lunch: "Steak and veggies",
                    dinner: "Baked dorada",
                  }}
                />
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
