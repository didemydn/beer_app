const { Schema, model } = require("mongoose");

const commentRatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  beer: {
    type: Schema.Types.ObjectId,
    ref: "Beer",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentRating = model("comment-rating", commentRatingSchema);

module.exports = CommentRating;
