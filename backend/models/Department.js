const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hod: {
    type: String, // HoD's name as a simple string
    required: true,
    unique: true,
  },
  department_coordinator: {
    type: mongoose.Schema.Types.ObjectId, // Reference to DepartmentCoordinator model
    ref: "DepartmentCoordinator",
    required: true,
    unique: true,
  },
  faculties: [
    {
      type: mongoose.Schema.Types.ObjectId, // References to Faculty model
      ref: "User",
    },
  ],
  year_wise_intake: {
    type: Number,
    required: true,
  },
  academic_performance: {
    highest_cgpa_year_wise: [
      {
        year: {
          type: Number,
          required: true,
        },
        cgpa: {
          type: Number,
          required: true,
        },
      },
    ],
    research_publications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
      },
    ],
    conferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;

//dummy data exmaple
// {
//     "department_id": "64f0b0549c2d4f8d2b7d5c4b",
//     "name": "Computer Science",
//     "hod": "Dr. John Doe", // HoD's name as a string
//     "department_coordinator": "64f0b0b49c2d4f8d2b7d5c4e", // Coordinator ID
//     "faculties": [
//         "64f0b0c89c2d4f8d2b7d5c4f", // Faculty IDs
//         "64f0b0d89c2d4f8d2b7d5c4g"
//     ],
//     "year_wise_intake": 120,
//     "academic_performance": {
//       "highest_cgpa_year_wise": [
//         {"year": 2023, "cgpa": 9.5},
//         {"year": 2022, "cgpa": 9.4}
//       ],
//       "research_publications": ["64f0b0a89c2d4f8d2b7d5c4d"], // Publication IDs
//       "conferences": ["64f0b0b49c2d4f8d2b7d5c4e"] // Event IDs
//     }
// }
