import { useState } from "react";
import { trpc } from "./trpc/client";
import type { GetTodos } from "../@types/type";

function App() {
  const [todoInput, setTodoInput] = useState<string>("");

  const todos = trpc.getTodos.useQuery<GetTodos[]>();
  const createTodo = trpc.createTodo.useMutation({
    onSettled: () => {
      todos.refetch();
    },
  });
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      todos.refetch();
    },
  });
  const completeTodo = trpc.editTodo.useMutation({
    onSettled: () => {
      todos.refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (todoInput.length !== 0) {
        await createTodo.mutate({
          isCompleted: false,
          todo: todoInput,
        });
      }
    } catch (err) {
      console.error(err);
    }

    setTodoInput("");
  };

  return (
    <div
      style={{
        height: "40vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {todos.data?.map((items) => {
        return (
          <span
            key={items._id}
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <span
              style={{
                cursor: "pointer",
              }}
              onDoubleClick={async () => {
                completeTodo.mutate({
                  _id: items._id,
                  isCompleted: !items.isCompleted,
                });
              }}
            >
              {items.isCompleted ? "done" : "pending"}
            </span>
            <span>{items.todo}</span>
            <button
              onClick={async () => {
                await deleteTodo.mutate(items._id);
              }}
            >
              Del
            </button>
          </span>
        );
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="write todo..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
