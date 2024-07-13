import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Form from "./Form";

import { prisma } from "@/prisma/client";
import { inngest } from "@/inngest";
import Link from "next/link";
import TopBarDesktop from "@/components/navs/topBar";
import SideNavDesktop from "@/components/navs/sideNav";

export async function create(message: string, userId: string) {
  "use server";
  if (!userId) {
    throw new Error("You must be signed in to create messages!");
  }
  const createdMessage = await prisma.messages.create({
    data: { text: message, author: userId },
  });

  const aiResponse = await inngest.send({
    name: "app/ask.ai",
    data: {
      messageId: createdMessage.xata_id,
    },
  });

  return aiResponse;
}

export default async function CreatePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("params", params);
  return (
    <main className="flex min-h-dvh flex-col items-center relative dark:bg-black">
      <div className="z-10 w-full max-w-5xl flex flex-col flex-1 px-10">
        <TopBarDesktop subpage={"Add weekly plan"} />
        <div className="w-full flex p-2">
          <SideNavDesktop activeRoute="create" />
          <div className="flex-1 w-full h-full flex justify-center items-center flex-col gap-6 pb-24">
            <div className="flex justify-center items-center flex-col gap-6">
              <SignedIn>
                <Form create={create} latestMessage={""} />
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
