const express = require("express");
const Department = require("../models/Department"); // Import the Department model
const router = express.Router();

// Create a new department
router.post("/createdepartment", async (req, res) => {
    try {
        const departmentData = req.body;
        const department = new Department(departmentData);
        await department.save();
        return res.status(201).json({ status: "ok", department });
    } catch (error) {
        console.error("Error creating department: ", error);
        return res.status(500).json({ status: "error", error: "Failed to create department" });
    }
});

// Get all departments
router.get("/alldepartment", async (req, res) => {
    try {
        const departments = await Department.find({});
        return res.status(200).json({ status: "ok", departments });
    } catch (error) {
        console.error("Error fetching departments: ", error);
        return res.status(500).json({ status: "error", error: "Failed to fetch departments" });
    }
});

// Get a department by ID
// router.get("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const department = await Department.findById(id).populate("department_coordinator").populate("faculties");
//         if (!department) return res.status(404).json({ status: "error", error: "Department not found" });
//         return res.status(200).json({ status: "ok", department });
//     } catch (error) {
//         console.error("Error fetching department: ", error);
//         return res.status(500).json({ status: "error", error: "Failed to fetch department" });
//     }
// });

// Update a department
router.put("/updatedepartment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const departmentData = req.body;
        const department = await Department.findByIdAndUpdate(id, departmentData, { new: true });
        if (!department) return res.status(404).json({ status: "error", error: "Department not found" });
        return res.status(200).json({ status: "ok", department });
    } catch (error) {
        console.error("Error updating department: ", error);
        return res.status(500).json({ status: "error", error: "Failed to update department" });
    }
});

// Delete a department
router.delete("/deletedepartment/:id", async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return res.status(404).json({ status: "error", error: "Department not found" });
        return res.status(200).json({ status: "ok", message: "Department deleted successfully" });
    } catch (error) {
        console.error("Error deleting department: ", error);
        return res.status(500).json({ status: "error", error: "Failed to delete department" });
    }
});

module.exports = router;
