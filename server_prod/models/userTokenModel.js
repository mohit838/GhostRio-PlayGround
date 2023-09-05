import mongoose, { Schema } from "mongoose";

const UserTokenSchema = new Schema(
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
      expires: 30 * 86400, // 30 days to expire
    },
  },
  { timestamps: true }
);

const UserToken = mongoose.model("UserToken", UserTokenSchema);

export default UserToken;
