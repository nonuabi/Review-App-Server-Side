const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: String,
      trim: true,
      require: true,
    },
    Description: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    latitude: {
      type: Number,
      require: true,
    },
    longitude: {
      type: Number,
      require: true,
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
    comments: [
      {
        comment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "comment",
        },
      },
    ],
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("post", postSchema);
