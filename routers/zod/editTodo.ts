import * as z from "zod";
import { createTodoSchema } from "./createTodo";

export const editTodoSchema = z.object({
  id: z.string().nonempty(),
  body: createTodoSchema,
});

export type editTodoSchema = z.infer<typeof editTodoSchema>;
