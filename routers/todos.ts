import Todo from "../lib/schema/todosSchema";
import { t } from "../trpc";
import { createTodoSchema } from "./zod/createTodo";
import * as z from "zod";

export const appRouter = t.router({
  getTodos: t.procedure.query(async ({ ctx: { res } }) => {
    const allTodos = await Todo.find();

    res.status(200);

    return allTodos;
  }),

  createTodo: t.procedure
    .input(createTodoSchema)
    .mutation(async ({ ctx: { res }, input }) => {
      const createTodo = await Todo.create({
        todo: input.todo,
        isCompleted: input.isCompleted || false,
      });

      res.status(201);

      return createTodo;
    }),

  deleteTodo: t.procedure
    .input(String)
    .mutation(async ({ ctx: { res }, input }) => {
      const deletedTodo = await Todo.findByIdAndDelete(input);

      if (!deletedTodo) {
        res.status(400).json({ message: "failed to delete todo" });
        throw new Error("failed to delete todo");
      }

      res.status(200);

      return deletedTodo;
    }),

  editTodo: t.procedure
    .input(
      z.object({
        _id: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(async ({ ctx: { res }, input }) => {
      const { _id, isCompleted } = input;

      const editedTodo = Todo.findByIdAndUpdate(_id, {
        $set: { isCompleted },
      });

      if (!editedTodo) {
        res.status(400).json({ message: "failed to edit todo" });
        throw new Error("failed to edit todo");
      }

      res.status(200);

      return editedTodo;
    }),
});
