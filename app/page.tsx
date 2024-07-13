import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import hero_img from "./hero_img.jpg";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Image
        src={hero_img}
        className="absolute left-0 right-0 top-0 bottom-0 object-cover z-0 h-dvh w-dvw"
        alt="meals"
      />
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center h-dvh w-dvw bg-gradient-to-b from-white to-[#ffffff7c] dark:from-black dark:to-[#00000088]">
        <div className="z-10 w-full max-w-5xl flex flex-col flex-1">
          <div className="w-full py-4 px-4 flex justify-between items-center">
            <h1 className="font-righteous text-[32px] text-[#8AA100]">
              MeaLoo
            </h1>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div>
                <UserButton />
              </div>
            </SignedIn>
          </div>
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
                <div className="bg-black rounded-md px-[16px] py-[12px] w-full flex justify-center shadow-sm">
                  <Link
                    href="/dashboard"
                    className="text-raleway text-white text-[16px] text-center w-full h-full"
                  >
                    Let's go
                  </Link>
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
