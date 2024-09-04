const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    default:"pending",
    enum:["pending","rejected", "approved"]
  },
  url:{
    type:String,
    required:true,
  }
});

const Publication = mongoose.model("Publication", PublicationSchema);

module.exports = Publication;
