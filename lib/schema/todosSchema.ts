import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.model("Todo", todosSchema);
