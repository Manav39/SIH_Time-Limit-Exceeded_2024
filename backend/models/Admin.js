const mongoose = require("mongoose");
const UserSchema = require("./User");

// Define the Admin schema by extending the User schema
const AdminSchema = new mongoose.Schema({
  // Inherit fields from UserSchema
  ...UserSchema.obj,
  adminId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
