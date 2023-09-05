import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superjson from "superjson";

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};
