import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

export const Notification = mongoose.model(
  "Notification",
  notificationSchema
);
