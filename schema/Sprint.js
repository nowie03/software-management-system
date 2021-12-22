const Mongoose = require("mongoose");

const sprintSchema = Mongoose.Schema({
  name: String,
  startedAt: Date,
  deadline: Date,
  status: String,
  tasks: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  module: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Module",
  },
  project: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Sprint = Mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
