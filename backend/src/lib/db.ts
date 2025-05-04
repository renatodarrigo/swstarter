import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
  type: { type: String, required: true },
  search: { type: String, required: false },
  term: { type: String, required: false },
  id: { type: String, required: false },
  time: { type: Number, required: true },
  datetime: { type: String, required: true },
});

export const RequestLog = mongoose.model("RequestLog", requestLogSchema);

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/swstarter"
  );
  console.log("Connected to MongoDB");
}
