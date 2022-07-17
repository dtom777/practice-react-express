const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    month: {
      type: Number,
    },
    electricity: {
      type: Number,
    },
    gas: {
      type: Number,
    },
    water: {
      type: Number,
    },
    internet: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
