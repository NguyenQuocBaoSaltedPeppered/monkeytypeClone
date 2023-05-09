const mongoose = require("mongoose");

const { Schema } = mongoose;

const historySchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mode: {
      type: String,
      require: true,
    },
    wpm: {
      type: Number,
      default: 0,
    },
    raw: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
