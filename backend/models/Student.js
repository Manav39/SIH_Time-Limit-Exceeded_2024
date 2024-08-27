const mongoose = require("mongoose");
const UserSchema = require("./User"); // Import the User schema

// Extend UserSchema with additional fields specific to Student
const StudentSchema = new mongoose.Schema({
  // Inherit fields from UserSchema
  ...UserSchema.obj,  // Spread the UserSchema fields

  // Additional fields for Student
  regId: {
    type: Number,
    required: true,
    unique: true, // Ensure registration ID is unique
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department", // Reference to the Department model
    required: true, // Make department field required
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
