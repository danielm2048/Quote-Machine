const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    author: { type: String, required: true },
    picture: { type: String, required: true },
    type: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
