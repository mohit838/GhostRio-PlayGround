import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
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

const User = mongoose.model("User", userSchema);

export default User;
