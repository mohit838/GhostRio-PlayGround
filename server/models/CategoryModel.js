import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);


export default mongoose.model.Categorys || mongoose.model("Category", CategorySchema);
