const Mongoose = require("mongoose");

const taskSchema = Mongoose.Schema({
  name: String,
  status: String,
  assignedTo: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  Bugs: [
    {
      type: Mongoose.SchemaTypes.ObjectId,
      ref: "Bug",
    },
  ],
  sprint: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "Sprint",
  },
  description: String,
});

const Task = Mongoose.model("Task", taskSchema);

module.exports = Task;
