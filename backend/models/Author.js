const mongoose = require("mongoose");
const UserSchema = require("./User");

// Define the Author schema by extending the User schema
const AuthorSchema = new mongoose.Schema({
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'UserSchema',
  },
  department: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
