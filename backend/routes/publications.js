const express = require("express");
const router = express.Router();
const Publication = require("../models/Publications");
const DepartmentCoordinator = require("../models/DeptCoord");

// Create a new publication
router.post("/addpublication", async (req, res) => {
  try {
    const { title, date, authors, description, department } = req.body;
    const publication = new Publication({ title, date, authors, description });
    await publication.save();
    const coordinator = await DepartmentCoordinator.findOne({
      department: department,
    });

    console.log(coordinator);

    if (!coordinator) {
      return res
        .status(404)
        .send({ error: `Coordinator not found for department: ${department}` });
    }
    console.log(publication);
    coordinator.pendingApprovals.push(publication._id);
    await coordinator.save();
    res.status(201).send({
      message: "Publication added and coordinator's pending approvals updated",
      publication,
    });
  } catch (error) {
    res
      .status(400)
      .send({ error: "Error creating publication", details: error.message });
  }
});

// Get a specific publication by ID
router.get("/publications/:id", async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id).populate(
      "authors"
    );
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching publication", details: error });
  }
});

// Update a publication by ID
router.patch("/updatepublication/:id", async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("authors");
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res
      .status(400)
      .send({ error: "Error updating publication", details: error });
  }
});

// Delete a publication by ID
router.delete("/deletepublication/:id", async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error deleting publication", details: error });
  }
});

// Get all publications
router.get("/allpublication", async (req, res) => {
  try {
    const publications = await Publication.find({});
    res.status(200).send(publications);
  } catch (error) {
    res.status(500).send({ error: "Error fetching", details: error });
  }
});

module.exports = router;
