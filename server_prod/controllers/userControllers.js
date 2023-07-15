export const allUsers = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      msg: "Get All Users",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      msg: "NS In Problem!!",
    });
  }
};
