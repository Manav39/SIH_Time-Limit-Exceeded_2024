const express = require("express");
const router = express.Router();
const DepartmentCoordinator = require("../models/DeptCoord");

// Create a new department coordinator
router.post("/adddepartmentcoordinator", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      pendingApprovals,
      approvedData,
      pendingPublications,
      approvedPublications,
    } = req.body;

    // Ensure the department is unique
    const existingCoordinator = await DepartmentCoordinator.findOne({
      department,
    });
    if (existingCoordinator) {
      return res
        .status(400)
        .json({ error: "Department already has a coordinator." });
    }

    const coordinator = new DepartmentCoordinator({
      name,
      email,
      password,
      department,
      pendingApprovals,
      approvedData,
      pendingPublications,
      approvedPublications,
    });

    await coordinator.save();
    res.status(201).json(coordinator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all department coordinators
router.get("/getalldepartmentcoordinator", async (req, res) => {
  try {
    const coordinators = await DepartmentCoordinator.find().populate(
      "approvedData pendingApprovals pendingPublications approvedPublications"
    );
    res.status(200).json(coordinators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a department coordinator by ID
router.put("/updatedepartmentcoordinator/:id", async (req, res) => {
  try {
    const updatedCoordinator = await DepartmentCoordinator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCoordinator) {
      return res.status(404).json({ error: "Coordinator not found" });
    }
    res.status(200).json(updatedCoordinator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a department coordinator by ID
router.delete("/deletedepartmentcoordinator/:id", async (req, res) => {
  try {
    const deletedCoordinator = await DepartmentCoordinator.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCoordinator) {
      return res.status(404).json({ error: "Coordinator not found" });
    }
    res.status(200).json({ message: "Coordinator deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Get a specific department coordinator by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const coordinator = await DepartmentCoordinator.findById(req.params.id).populate("approvedData pendingApprovals pendingPublications approvedPublications");
//     if (!coordinator) {
//       return res.status(404).json({ error: "Coordinator not found" });
//     }
//     res.status(200).json(coordinator);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
