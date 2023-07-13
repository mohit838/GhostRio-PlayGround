import mongoose from "mongoose";

export const StoreSchema = new mongoose.Schema(
  {
    isVendorId: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: [true, "Please provide a valid email."],
      unique: true,
    },
    storeLogo: {
      type: String,
      required: [true, "Please provide a store logo."],
    },
    vendorMobile: {
      type: Number,
      required: [true, "Please provide a unique mobile number."],
      unique: true,
    },
    storeAddress: {
      type: String,
      required: [true, "Please provide a valid address."],
    },
    zipCode: {
      type: String,
      required: false,
    },
    // Ref: https://mongoosejs.com/docs/geojson.html
    storeLocations: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

// Ref: https://mongoosejs.com/docs/geojson.html
StoreSchema.index({ location: "2dsphere" });

export default mongoose.model.Stores || mongoose.model("Store", StoreSchema);
