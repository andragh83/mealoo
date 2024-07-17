import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import hero_img from "./hero_img.jpg";
import TopBarDesktop from "@/components/navs/topBar";
import LinkButton from "@/components/buttons/linkButton";
import { auth } from "@clerk/nextjs/server";
import { getPlansCount } from "./actions";

export default async function Home() {
  const { userId } = auth();
  const plansCount = userId ? await getPlansCount(userId) : undefined;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Image
        src={hero_img}
        className="absolute left-0 right-0 top-0 bottom-0 object-cover z-0 h-dvh w-dvw"
        alt="meals"
      />
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center h-dvh w-dvw bg-gradient-to-b from-neutral-50 via-[#fafafad3] to-[#fafafaa6] dark:from-black dark:to-[#00000088]">
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-10">
          <SignedIn>
            <TopBarDesktop />
          </SignedIn>
          <div className="w-full h-full flex justify-center items-center flex-col gap-6 pb-24">
            <div className="flex justify-center items-center flex-col gap-8">
              <div>
                <h2 className="font-righteous text-[48px] sm:text-[64px] md:text-[76px] text-center">
                  MeaLoo
                </h2>
                <p className="font-raleway text-center text-[22px]">
                  AI powered Meal planning
                </p>
              </div>
              <SignedIn>
                {plansCount && plansCount > 0 ? (
                  <div className="flex flex-col-reverse w-full gap-4 sm:flex-row sm:w-auto sm:gap-6">
                    <LinkButton
                      text="See your plans"
                      url="/plans"
                      extraBtnStyle="bg-transparent border border-black w-full !bg-[#fafafa]"
                      extraBtnTextStyle="!text-black"
                    />
                    <LinkButton
                      text="Create a meal plan"
                      url="/create"
                      extraBtnStyle="bg-black dark:bg-black text-white dark:text:white w-full"
                      extraBtnTextStyle="!text-white"
                    />
                  </div>
                ) : (
                  <LinkButton
                    text="Create your first meal plan"
                    url="/create"
                    extraBtnStyle="bg-black dark:bg-black text-white dark:text:white w-full"
                    extraBtnTextStyle="!text-white"
                  />
                )}
              </SignedIn>
              <SignedOut>
                <div
                  className={`bg-primary dark:bg-[#434b15]  rounded-md px-[12px] py-[12px] flex justify-center items-center gap-4 shadow-lg`}
                >
                  <SignInButton />
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
