const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TrackScheme = new mongoose.Schema(
  {
    artist: {
      name: { type: String },
      nickname: { type: String },
      edad: { type: Number },
    },
    album: { type: String },
    cover: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TrackScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TrackScheme);
