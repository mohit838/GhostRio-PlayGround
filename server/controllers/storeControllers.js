import StoreModel from "../models/StoreModel.js";
import UserModel from "../models/UserModel.js";

/**
 * API: http://localhost:5000/api/store/create-store
 */
export const createStore = async (req, res) => {
  const {
    isVendorId,
    businessEmail,
    vendorMobile,
    storeAddress,
    zipCode,
    latitude,
    longitude,
  } = req.body;

  try {
    const userData = await UserModel.findOne({ _id: isVendorId });

    // If user isVendor property is true then
    if (userData) {
      // Check latitude and longitude values
      // If not then shows error msg
      if (!latitude && !longitude) {
        return res.status(200).json({
          errors: [
            {
              msg: "Geo Location is Important!",
              param: "geo-location",
              success: false,
            },
          ],
        });
      } else {
        const isFindVendor = await StoreModel.findOne({ isVendorId });

        if (isFindVendor) {
          return res.status(200).json({
            errors: [
              {
                msg: "Already Vendor have store!",
                param: "isStore",
                success: false,
              },
            ],
          });
        } else {
          const newVendorStore = new StoreModel({
            isVendorId,
            storeAddress,
            zipCode,
            businessEmail,
            vendorMobile,
            storeLogo: req.file.filename,
            storeLocations: {
              type: "Point",
              coordinates: [parseFloat(latitude), parseFloat(longitude)],
            },
          });

          const newStore = await newVendorStore.save();

          return res.status(200).json({
            errors: [
              {
                msg: "Vendor created store!",
                param: "isStore",
                success: true,
                data: newStore,
              },
            ],
          });
        }
      }
    } else {
      return res.status(401).json({
        errors: [
          {
            msg: `User is not a vendor!`,
            param: "isVendor",
            success: false,
          },
        ],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};
