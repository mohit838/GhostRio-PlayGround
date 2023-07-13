import CategoryModel from "../models/CategoryModel.js";

/**
 * API: http://localhost:5000/api/store/create-category
 */
export const createCategory = async (req, res) => {
  const { category } = req.body;

  try {
    if (category) {
      const allCategoryData = await CategoryModel.find();

      if (allCategoryData.length > 0) {
        let checking = false;
        for (let i = 0; i < allCategoryData.length; i++) {
          if (
            allCategoryData[i]["category"].toLowerCase() ===
            category.toLowerCase()
          ) {
            checking = true;
            break;
          }
        }
        if (checking === true) {
          return res.status(200).json({
            errors: [
              {
                msg: "Category exist!",
                param: "category",
                success: true,
              },
            ],
          });
        } else {
          const newCategory = await CategoryModel.create({ category });

          return res.status(200).json({
            errors: [
              {
                msg: "Category create successfully!",
                param: "category",
                success: true,
                data: newCategory,
              },
            ],
          });
        }
      } else {
        const newCategory = await CategoryModel.create({ category });

        return res.status(200).json({
          errors: [
            {
              msg: "Category create successfully!",
              param: "category",
              success: true,
              data: newCategory,
            },
          ],
        });
      }
    } else {
      return res.status(401).json({
        errors: [
          {
            msg: `${category} is not created!`,
            param: "category",
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
