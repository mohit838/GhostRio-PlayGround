export const userSignIn = async (req, res) => {
  try {
    console.log(req.body);

    res.status(200).json({
      success: true,
      msg: "userSignIn",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      msg: "NS In Problem!!",
    });
  }
};
