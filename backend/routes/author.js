const express = require("express");
const Author = require("../models/Author");
const router = express.Router();


// Route to create a new author
router.post("/createauthor", async (req, res) => {
    try {
        const { author, department } = req.body;

        const newAuthor = new Author({
            author,
            department,
        });

        console.log("in author", newAuthor);

        const savedAuthor = await newAuthor.save();

        res.status(201).json({
            message: "Author created successfully",
            author: savedAuthor,
        });
    } catch (err) {
        console.error("Error creating author:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to get all authors
router.get("/allauthor", async (req, res) => {
    try {
        const authors = await Author.find({});

        if(!authors) {
            return res.status(404).json({success, error:"no authors found"});
        }
        res.status(200).json(authors);
    } catch (err) {
        console.error("Error fetching authors:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to get an author by ID
router.get("/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate("publications");
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(author);
    } catch (err) {
        console.error("Error fetching author:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to update an author by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate("publications");
        if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
        res.status(200).json({
            message: "Author updated successfully",
            author: updatedAuthor,
        });
    } catch (err) {
        console.error("Error updating author:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to delete an author by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: "Author not found" });
        res.status(200).json({ message: "Author deleted successfully" });
    } catch (err) {
        console.error("Error deleting author:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
