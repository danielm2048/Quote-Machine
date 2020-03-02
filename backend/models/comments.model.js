const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    userName: { type: String, required: true },
    quoteId: { type: String, required: true },
    text: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
