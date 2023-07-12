/**
 * API: http://localhost:5000/api/dashboard
 */
export const dashboardHome = async (req, res) => {
  console.log(req.body);

  return res.status(201).json({ success: true, msg: "You Dashboard." });
};
