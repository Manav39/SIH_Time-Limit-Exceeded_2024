const mongoose = require("mongoose");

// Define the DepartmentCoordinator schema by extending the User schema
const DepartmentCoordinatorSchema = new mongoose.Schema({
  // Inherit fields from UserSchema
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    unique:true,
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
