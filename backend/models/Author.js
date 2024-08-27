const mongoose = require("mongoose");
const UserSchema = require("./User");

// Define the Author schema by extending the User schema
const AuthorSchema = new mongoose.Schema({
  ...UserSchema.obj, // Spread the User schema fields
  dept: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
