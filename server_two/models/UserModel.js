import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    name: {
      
    }
  },
  { timestamps: true }
);

export default mongoose.model.Users || mongoose.model("User", UserSchema);
