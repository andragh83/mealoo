import { SignedIn, SignedOut } from "@clerk/nextjs";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";
import MealCard from "@/components/cards/mealCard";
import MealCardSmall from "@/components/cards/mealCardSmall";

export default async function DashboardPage({
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
          <SideNavDesktop activeRoute="dashboard" />
          <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24">
            <div className="flex justify-center items-center flex-col gap-6">
              <SignedIn>
                <MealCard
                  meal={{
                    variant: "breakfast",
                    recipe_name: "Greek Yogurt with Berries and Nuts",
                    prep_time: 5,
                    cooking_time: 0,
                    calories: 250,
                    cost: 4,
                    url: "some",
                  }}
                />
                <MealCard
                  meal={{
                    variant: "lunch",
                    recipe_name: "Greek Yogurt with Berries and Nuts",
                    prep_time: 5,
                    cooking_time: 0,
                    calories: 250,
                    cost: 4,
                    url: "some",
                  }}
                />
                <MealCard
                  meal={{
                    variant: "dinner",
                    recipe_name: "Greek Yogurt with Berries and Nuts",
                    prep_time: 5,
                    cooking_time: 0,
                    calories: 250,
                    cost: 4,
                    url: "some",
                  }}
                />

                <MealCardSmall
                  meal={{
                    variant: "breakfast",
                    recipe_name: "Greek Yogurt with Berries and Nuts",
                    prep_time: 5,
                    cooking_time: 0,
                    calories: 250,
                    cost: 4,
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
