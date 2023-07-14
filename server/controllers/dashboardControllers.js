export const userDashboard = (req, res) => {
  console.log(req);
  res.status(200).json({ message: "User is authenticated." });
};
