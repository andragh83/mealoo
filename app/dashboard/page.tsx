import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Form from "./Form";

import { prisma } from "@/prisma/client";
import { inngest } from "@/inngest";

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

export default async function DashboardPage() {
  const message = await prisma.messages.findFirst({
    orderBy: { xata_createdat: "desc" },
  });
  return (
    <main className="flex min-h-dvh flex-col items-center relative dark:bg-black">
      <div className="z-10 w-full max-w-5xl flex flex-col flex-1">
        <div className="w-full py-4 px-4 flex justify-between items-center">
          <h1 className="font-righteous text-[32px] text-[#8AA100]">MeaLoo</h1>
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
          <div className="flex justify-center items-center flex-col gap-6">
            <SignedIn>
              <Form create={create} latestMessage={message} />
            </SignedIn>
            <SignedOut>
              <h1>Sign in to create new messages</h1>
            </SignedOut>
          </div>
        </div>
      </div>
    </main>
  );
}
