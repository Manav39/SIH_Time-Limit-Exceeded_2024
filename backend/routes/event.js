const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create a new event
router.post('/addevent', async (req, res) => {
  try {
    const { name, department, date, images ,description, type  } = req.body;

    const event = new Event({ name, department, date, images, description, type  });
    
    await event.save();
    
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send({ error: 'Error creating event', details: error });
  }
});

// Get all events
router.get('/allevent', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching events', details: error });
  }
});

// Get a specific event by ID
// router.get('/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id).populate('participants');
//     if (!event) {
//       return res.status(404).send();
//     }
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(500).send({ error: 'Error fetching event', details: error });
//   }
// });

// Update an event by ID
router.patch('/updateevent/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) {
      return res.status(404).send();
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send({ error: 'Error updating event', details: error });
  }
});

// Delete an event by ID
router.delete('/deleteevent/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ error: 'Error deleting event', details: error });
  }
});

module.exports = router;
