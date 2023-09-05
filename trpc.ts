import { initTRPC } from "@trpc/server";
import { createContext } from "./context/createContext";
import { inferAsyncReturnType } from "@trpc/server/";

export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();
