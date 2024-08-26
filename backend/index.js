const express = require("express");
const { connectToMongo } = require("./connect");
const cors = require("cors");
const UserSchema = require("./routes/user");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8088;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongo(
  "mongodb+srv://manav:manav@cluster0.z1c0jrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

app.use("/", UserSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
