const { findById } = require("../../schema/Bug");
const Bug = require("../../schema/Bug");
const Task = require("../../schema/Task");
const createBugFunction = async (parent, args) => {
  let newBug = new Bug({
    debuggedBy: args.type.debuggedBy,
    description: args.type.description,
    status: args.type.status,
    task: args.type.task,
  });

  await Task.findByIdAndUpdate(args.type.task, {
    $push: {
      bugs: newBug.id,
    },  
  });

  await newBug.save();
  console.log(newBug.id);
  return await Bug.findById(newBug.id).populate("task debuggedBy");
};
const truncateBugFunction = async (parent, args) => {
  await Task.findByIdAndUpdate(args.taskId, {
    $push: {
      bugs: args.bugId,
    },
  });

  return await Bug.findByIdAndDelete(args.bugId).populate("task debuggedBy");
};
const updateBugFunction = async (parent, args) => {
   return await Bug.findByIdAndUpdate(args.bugId, {
    debuggedBy: args.type.debuggedBy,
    description: args.type.description,
    status: args.type.status,
  }).populate("task debuggedBy" );
};

module.exports = {
  createBug: createBugFunction,
  truncateBug: truncateBugFunction,
  updateBug: updateBugFunction,
};
