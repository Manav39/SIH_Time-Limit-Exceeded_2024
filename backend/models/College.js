const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    vision: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    departments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department', // Reference to the Department model
        }
    ],
    logoUrl: {
        type: String,
        required: true, // Optional: set to false if not all colleges will have a logo initially
    },
    boardOfDirectors: [
        {
            type: String,
            required: true,
        }
    ],
    administrativeOfficers: [
        {
            type: String,
            required: true,
        }
    ],
    aboutCollege: {
        type: String,
        required: true,
    }
});

const College = mongoose.model("College", CollegeSchema);

module.exports = College;
