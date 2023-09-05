import { appRouter } from "./routers/todos";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { mongoConnect } from "./lib/db";
import dotenv from "dotenv";
import { createContext } from "./context/createContext";

dotenv.config();

mongoConnect();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "*" }));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export type AppRouter = typeof appRouter;
