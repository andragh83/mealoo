import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import hero_img from "./hero_img.jpg";
import TopBarDesktop from "@/components/navs/topBar";
import LinkButton from "@/components/buttons/linkButton";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Image
        src={hero_img}
        className="absolute left-0 right-0 top-0 bottom-0 object-cover z-0 h-dvh w-dvw"
        alt="meals"
      />
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center h-dvh w-dvw bg-gradient-to-b from-neutral-50 to-[#ffffff7c] dark:from-black dark:to-[#00000088]">
        <div className="z-10 w-full max-w-7xl flex flex-col flex-1 px-10">
          <TopBarDesktop />
          <div className="w-full h-full flex justify-center items-center flex-col gap-6 pb-24">
            <div className="flex justify-center items-center flex-col gap-8">
              <SignedIn>
                <div>
                  <h2 className="font-righteous text-[76px] leading-[90px]">
                    MeaLoo
                  </h2>
                  <p className="font-raleway text-center text-[22px]">
                    Stress free meal planning
                  </p>
                </div>
                <LinkButton
                  text="Let's go"
                  url="/create"
                  extraBtnStyle="w-full"
                  extraBtnTextStyle="!text-white"
                />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
