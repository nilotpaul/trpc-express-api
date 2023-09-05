import * as z from "zod";

export const createTodoSchema = z.object({
  todo: z.string().nonempty(),
  isCompleted: z.boolean().default(false),
});

export type createTodoSchema = z.infer<typeof createTodoSchema>;
