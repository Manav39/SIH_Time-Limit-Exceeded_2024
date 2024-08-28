const express = require("express");
const { connectToMongo } = require("./connect");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8088;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
connectToMongo(process.env.MONGO_URI || "mongodb+srv://tle:tle@tle.eryr0.mongodb.net/?retryWrites=true&w=majority&appName=TLE")
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Import and use the user routes
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");
const publicationRoutes = require("./routes/publications");
const eventRoutes = require("./routes/event");



app.use("/", userRoutes);
app.use("/author", authorRoutes);
app.use("/publications",  publicationRoutes);
app.use("/events", eventRoutes);

// Root route for testing the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
