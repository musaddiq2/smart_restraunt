import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* ==========================================================
   🔐 Helper to generate JWT
   ========================================================== */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* ==========================================================
   🧍‍♂️ Register Normal User
   ========================================================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

/* ==========================================================
   🔑 Login User
   ========================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Check if user is blocked
    if (user.status === "Blocked") {
      return res.status(403).json({ message: "Your account has been blocked. Please contact administrator." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

/* ==========================================================
   👑 Register a New Admin (Super Admin Only)
   ========================================================== */
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Only superadmin can create admins
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Only Super Admin can create admins" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Don't hash password manually - let the User model's pre-save hook handle it
    const newAdmin = await User.create({
      name,
      email,
      password, // Pass plain password - pre-save hook will hash it
      role: "admin",
      permissions: permissions || {
        canManageMenus: true,
        canManageOrders: true,
        canManageTables: true,
        canAccessDashboard: true
      }
    });

    res.status(201).json({
      success: true,
      message: "✅ New admin created successfully",
      admin: {
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        permissions: newAdmin.permissions,
      },
    });
  } catch (error) {
    console.error("❌ Admin creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================================================
   📋 Get All Admins (Super Admin Only)
   ========================================================== */
export const getAllAdmins = async (req, res) => {
  try {
    // Only superadmin can view all admins
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Only Super Admin can view all admins" });
    }

    const AdminRestaurant = (await import("../models/adminRestaurantModel.js")).default;
    const Restaurant = (await import("../models/restaurantModel.js")).default;

    const admins = await User.find({ role: "admin" })
      .select("-password")
      .sort({ createdAt: -1 });

    // Get restaurant assignments for each admin
    const adminsWithRestaurants = await Promise.all(
      admins.map(async (admin) => {
        const assignments = await AdminRestaurant.find({ adminId: admin._id })
          .populate("restaurantId", "name restaurantId address");
        
        const adminObj = admin.toObject();
        // Filter out null restaurantId values and ensure we have valid restaurant objects
        adminObj.assignedRestaurants = assignments
          .map(a => a.restaurantId)
          .filter(r => r !== null && r !== undefined);
        return adminObj;
      })
    );

    res.status(200).json({
      success: true,
      count: adminsWithRestaurants.length,
      admins: adminsWithRestaurants,
    });
  } catch (error) {
    console.error("❌ Error fetching admins:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================================================
   🔒 Toggle Admin Status (Block/Unblock) (Admin Only)
   ========================================================== */
export const toggleAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["Active", "Blocked"].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid status. Must be 'Active' or 'Blocked'" 
      });
    }

    const admin = await User.findById(id);
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: "Admin not found" 
      });
    }

    if (admin.role !== "admin") {
      return res.status(400).json({ 
        success: false,
        message: "User is not an admin" 
      });
    }

    // Prevent blocking yourself
    if (admin._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ 
        success: false,
        message: "You cannot block yourself" 
      });
    }

    admin.status = status;
    await admin.save();

    res.status(200).json({
      success: true,
      message: `Admin ${status === "Active" ? "unblocked" : "blocked"} successfully`,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error) {
    console.error("❌ Error toggling admin status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================================================
   🏪 Assign Restaurant to Admin (Super Admin Only)
   ========================================================== */
export const assignRestaurantToAdmin = async (req, res) => {
  try {
    const { adminId, restaurantId } = req.body;

    // Only superadmin can assign restaurants
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Only Super Admin can assign restaurants" });
    }

    if (!adminId || !restaurantId) {
      return res.status(400).json({ message: "Admin ID and Restaurant ID are required" });
    }

    const AdminRestaurant = (await import("../models/adminRestaurantModel.js")).default;
    const Restaurant = (await import("../models/restaurantModel.js")).default;

    // Verify admin exists and is an admin
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Verify restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Check if already assigned
    const existing = await AdminRestaurant.findOne({ adminId, restaurantId });
    if (existing) {
      return res.status(400).json({ message: "Restaurant already assigned to this admin" });
    }

    // Create assignment
    const assignment = await AdminRestaurant.create({
      adminId,
      restaurantId,
      assignedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant assigned successfully",
      assignment: await AdminRestaurant.findById(assignment._id).populate("restaurantId", "name restaurantId"),
    });
  } catch (error) {
    console.error("❌ Error assigning restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================================================
   🗑️ Remove Restaurant Assignment (Super Admin Only)
   ========================================================== */
export const removeRestaurantFromAdmin = async (req, res) => {
  try {
    const { adminId, restaurantId } = req.body;

    // Only superadmin can remove assignments
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Only Super Admin can remove restaurant assignments" });
    }

    const AdminRestaurant = (await import("../models/adminRestaurantModel.js")).default;

    const assignment = await AdminRestaurant.findOneAndDelete({ adminId, restaurantId });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant assignment removed successfully",
    });
  } catch (error) {
    console.error("❌ Error removing assignment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================================================
   🔐 Update Admin Permissions (Super Admin Only)
   ========================================================== */
export const updateAdminPermissions = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { permissions } = req.body;

    // Only superadmin can update permissions
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Only Super Admin can update permissions" });
    }

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update permissions
    if (permissions) {
      admin.permissions = {
        ...admin.permissions,
        ...permissions,
      };
      await admin.save();
    }

    res.status(200).json({
      success: true,
      message: "Permissions updated successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        permissions: admin.permissions,
      },
    });
  } catch (error) {
    console.error("❌ Error updating permissions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================================================
   📋 Get Admin's Assigned Restaurants (Admin Only)
   ========================================================== */
export const getAdminRestaurants = async (req, res) => {
  try {
    const adminId = req.user._id;

    // Only admin can view their own restaurants
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only Admin can view assigned restaurants" });
    }

    const AdminRestaurant = (await import("../models/adminRestaurantModel.js")).default;

    const assignments = await AdminRestaurant.find({ adminId })
      .populate("restaurantId", "name restaurantId address type status openingTime closingTime restaurantImg");

    const restaurants = assignments.map(a => a.restaurantId).filter(r => r !== null);

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants: restaurants,
    });
  } catch (error) {
    console.error("❌ Error fetching admin restaurants:", error);
    res.status(500).json({ message: "Server error" });
  }
};