const mongoose = require("mongoose");
const UserSchema = require("./User"); // Import the User schema

// Define the Faculty schema by extending the User schema
const FacultySchema = new mongoose.Schema({
  // Inherit fields from UserSchema
  ...UserSchema.obj,
  id: {
    type: Number,
    required: true,
    unique: true, // Ensure unique faculty IDs
  },
  department: {
    type: String,
    required: true, // Ensure that every faculty is associated with a department
  },
});

// Create the Faculty model
const Faculty = mongoose.model("Faculty", FacultySchema);

module.exports = Faculty;
