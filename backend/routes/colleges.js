const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Create a new college
router.post('/addcollege', async (req, res) => {
    try {
        const { name, vision, address, departments, logoUrl, boardOfDirectors, administrativeOfficers, aboutCollege } = req.body;

        const college = new College({
            name,
            vision,
            address,
            departments,
            logoUrl,
            boardOfDirectors,
            administrativeOfficers,
            aboutCollege
        });

        await college.save();
        res.status(201).send(college);
    } catch (error) {
        res.status(400).send({ error: 'Error creating college', details: error });
    }
});

// Get all colleges
router.get('/allcollege', async (req, res) => {
    try {
        const colleges = await College.find().populate('departments');
        res.status(200).send(colleges);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching colleges', details: error });
    }
});

// // Get a specific college by ID
router.get('/getcollege/:id', async (req, res) => {
    try {
        const college = await College.findById(req.params.id).populate('departments');
        if (!college) {
            return res.status(404).send({ error: 'College not found' });
        }
        res.status(200).send(college);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching college', details: error });
    }
});

// Update a college by ID
router.patch('/updatecollege/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'vision', 'address', 'departments', 'logoUrl', 'boardOfDirectors', 'administrativeOfficers', 'aboutCollege'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!college) {
            return res.status(404).send({ error: 'College not found' });
        }
        res.status(200).send(college);
    } catch (error) {
        res.status(400).send({ error: 'Error updating college', details: error });
    }
});

// Delete a college by ID
router.delete('/deletecollege/:id', async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) {
            return res.status(404).send({ error: 'College not found' });
        }
        res.status(200).send(college);
    } catch (error) {
        res.status(500).send({ error: 'Error deleting college', details: error });
    }
});

module.exports = router;
