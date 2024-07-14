import { Inngest, InngestMiddleware } from "inngest";
import { PrismaClient } from "@prisma/client";

// Declare global variable prismaGlobal
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

// make Prisma available in the Inngest functions
const prismaMiddleware = new InngestMiddleware({
  name: "Prisma Middleware",
  init() {
    // Create a singleton function for Prisma Client
    const prismaClientSingleton = () => {
      if (!globalThis.prismaGlobal) {
        globalThis.prismaGlobal = new PrismaClient();
      }
      return globalThis.prismaGlobal;
    };

    // Export the Prisma Client instance
    const prisma = prismaClientSingleton();

    return {
      onFunctionRun(ctx) {
        return {
          transformInput(ctx) {
            return {
              // Anything passed via `ctx` will be merged with the function's arguments
              ctx: {
                prisma,
              },
            };
          },
        };
      },
    };
  },
});

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "next-pxci-starter",
  middleware: [prismaMiddleware],
});
