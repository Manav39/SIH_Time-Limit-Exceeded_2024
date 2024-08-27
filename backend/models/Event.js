const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    images: [
        {
            type: String, // URL string to the image
            required: false, // Images might not always be available
        }
    ],
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Seminar", "Workshop", "Competition", "Other"], // Example event types
        default: "Other",
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
