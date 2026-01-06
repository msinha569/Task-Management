import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      trim: true
    },

    dueDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      index: true
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
      index: true
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Task = mongoose.model("Task", taskSchema);
