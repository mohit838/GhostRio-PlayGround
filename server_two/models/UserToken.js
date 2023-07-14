import mongoose, { Schema } from "mongoose";

export const UserToken = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 30 * 86400, // 30 Days
    },
  },
  { timestamps: true }
);

export default mongoose.model.UserTokens ||
  mongoose.model("UserToken", UserToken);
