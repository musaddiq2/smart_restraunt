import User from "../models/userModel.js";

/* FETCH ADMINS */
export const getAdmins = async (req, res) => {
  const admins = await User.find({
    role: { $in: ["admin", "staff"] },
  }).populate("restaurant");

  res.json(admins);
};

/* CHANGE ROLE */
export const updateAdminRole = async (req, res) => {
  const admin = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );
  res.json(admin);
};

/* BLOCK / UNBLOCK */
export const toggleAdminStatus = async (req, res) => {
  const admin = await User.findById(req.params.id);
  admin.status = admin.status === "Active" ? "Blocked" : "Active";
  await admin.save();
  res.json(admin);
};

/* RESET PASSWORD */
export const resetAdminPassword = async (req, res) => {
  // later: nodemailer
  res.json({ message: "Password reset email sent" });
};
