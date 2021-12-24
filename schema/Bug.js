const Mongoose = require("mongoose");

const bugSchema = Mongoose.Schema({
  debuggedBy: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  status: String,
  description: String,
  task: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "Task",
  },
});

const Bug = Mongoose.model("Bug", bugSchema);

module.exports = Bug;
