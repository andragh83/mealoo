import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ChevronRight from "../icons/svgs/chevronRight";

export default function TopBarDesktop({ subpage }: { subpage?: string }) {
  return (
    <div className="w-full py-4 px-4 flex justify-between items-center">
      <div className="flex items-baseline gap-6">
        <Link href={"/"}>
          <h1 className="font-righteous text-[32px] text-[#8AA100]">MeaLoo</h1>
        </Link>
        {subpage ? (
          <>
            <ChevronRight colour="fill-[#C4D080]" />

            <h2 className="font-raleway text-[20px] text-[#8AA100] uppercase">
              {subpage}
            </h2>
          </>
        ) : null}
      </div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
