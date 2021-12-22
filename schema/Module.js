const Mongoose = require("mongoose");

const moduleSchema = Mongoose.Schema({
  name: String,
  stratedAt: Date,
  EndsAt: Date,
  activeSprint: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Sprint",
  },
  completedSprints: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
    },
  ],
  upcomingSprints: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
    },
  ],
  project: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Module = Mongoose.model("Module", moduleSchema);

module.exports = Module;
