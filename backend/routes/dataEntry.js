const express = require("express");
const router = express.Router();
const DataEntry = require("../models/DataEntry");

// Create a new data entry
router.post("/add-data-entry", async (req, res) => {
  try {
    const { title, description, verificationLink, submittedBy, department } =
      req.body;

    const dataEntry = new DataEntry({
      title,
      description,
      verificationLink,
      submittedBy,
      department,
    });

    await dataEntry.save();
    res.status(201).send(dataEntry);
  } catch (error) {
    res
      .status(400)
      .send({ error: "Error creating data entry", details: error });
  }
});

// Get all data entries
router.get("/all-data-entry", async (req, res) => {
  try {
    const dataEntries = await DataEntry.find({});
    res.status(200).send(dataEntries);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching data entries", details: error });
  }
});

// Update a data entry by ID
router.patch("/update-data-entry/:id", async (req, res) => {
  // Check if the request body contains only the 'status' field
  if (!req.body.status) {
    return res.status(400).send({ error: "Status is required" });
  }

  try {
    // Find the data entry by ID and update only the status field
    const dataEntry = await DataEntry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!dataEntry) {
      return res.status(404).send({ error: "Data entry not found" });
    }

    res.status(200).send(dataEntry);
  } catch (error) {
    res
      .status(400)
      .send({ error: "Error updating data entry", details: error });
  }
});

// Delete a data entry by ID
router.delete("/delete-data-entry/:id", async (req, res) => {
  try {
    const dataEntry = await DataEntry.findByIdAndDelete(req.params.id);
    if (!dataEntry) {
      return res.status(404).send({ error: "Data entry not found" });
    }
    res.status(200).send(dataEntry);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error deleting data entry", details: error });
  }
});

// Get a specific data entry by ID
// router.get('/get-data-entries/:id', async (req, res) => {
//     try {
//         const dataEntry = await DataEntry.findById(req.params.id)
//             .populate('submittedBy', 'name email')
//             .populate('department', 'name');
//         if (!dataEntry) {
//             return res.status(404).send({ error: 'Data entry not found' });
//         }
//         res.status(200).send(dataEntry);
//     } catch (error) {
//         res.status(500).send({ error: 'Error fetching data entry', details: error });
//     }
// });

module.exports = router;
