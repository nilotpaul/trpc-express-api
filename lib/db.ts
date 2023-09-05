import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("mongodb connected");
  } catch (err) {
    throw new Error("failed to connect with mongodb");
  }
};
