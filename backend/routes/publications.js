const express = require('express');
const router = express.Router();
const Publication = require('../models/Publications');

// Create a new publication
router.post('/addpublication', async (req, res) => {
  try {
    const { title, date, authors, description } = req.body;

    // Create a new Publication instance
    const publication = new Publication({ title, date, authors, description });
    
    // Save the publication to the database
    await publication.save();
    
    res.status(201).send(publication);
  } catch (error) {
    res.status(400).send({ error: 'Error creating publication', details: error });
  }
});

// Get all publications
router.get('/allpublication', async (req, res) => {
  try {
    const publications = await Publication.find({});
    res.status(200).send(publications);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching publications', details: error });
  }
});

// Get a specific publication by ID
router.get('/publications/:id', async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id).populate('authors');
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching publication', details: error });
  }
});

// Update a publication by ID
router.patch('/updatepublication/:id', async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('authors');
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send({ error: 'Error updating publication', details: error });
  }
});

// Delete a publication by ID
router.delete('/deletepublication/:id', async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).send();
    }
    res.status(200).send(publication);
  } catch (error) {
    res.status(500).send({ error: 'Error deleting publication', details: error });
  }
});

module.exports = router;
