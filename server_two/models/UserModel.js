import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["user", "admin", "super_admin", "vendor"],
      default: ["user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model.Users || mongoose.model("User", UserSchema);
