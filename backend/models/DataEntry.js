const mongoose = require("mongoose");

const DataEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  verificationLink: {
    type: String,
    require: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (could be Student, Faculty, etc.)
    required: true,
  },
  department: {
    type: String,
    // ref: "Department", // Reference to the Department model
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    default: "achievements",
  },
  // You can add more fields here as needed
});

const DataEntry = mongoose.model("DataEntry", DataEntrySchema);

module.exports = DataEntry;
