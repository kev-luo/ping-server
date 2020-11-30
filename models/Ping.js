const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// NOTE: test
const pingSchema = new Schema(
  {
    body: String,
    imageUrl: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "86400s"
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        required: true,
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        body: String,
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        commentHash: [String],
      },
    ],
    support: [
      {
        supported: Boolean,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    // list of hashtags contained in the ping
    hashtagsList: [String],
  },
  { timestamps: true }
);

pingSchema.index({ location: "2dsphere" });
// pingSchema.index({"createdAt": 1}, { expiresAfterSeconds: 86400 });

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;
