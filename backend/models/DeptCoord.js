const mongoose = require("mongoose");
const UserSchema = require("./User"); // Import the User schema

// Define the DepartmentCoordinator schema by extending the User schema
const DepartmentCoordinatorSchema = new mongoose.Schema({
  // Inherit fields from UserSchema
  ...UserSchema.obj,
  department: {
    type: String,
    required: true,
  },
  approvedData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DataEntry", // Reference to the model that stores the data approved by the coordinator
    },
  ],
  pendingApprovals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DataEntry", // Reference to the model that stores the data pending approval
    },
  ],
  // Additional fields can be added if needed
});

const DepartmentCoordinator = mongoose.model("DepartmentCoordinator", DepartmentCoordinatorSchema);

module.exports = DepartmentCoordinator;
