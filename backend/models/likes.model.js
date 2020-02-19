const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    userId: { type: String, required: true },
    quoteId: { type: String, required: true },
    active: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
