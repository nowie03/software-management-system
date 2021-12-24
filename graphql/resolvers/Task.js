const Sprint = require("../../schema/Sprint");
const Task = require("../../schema/Task");

const getTasksFunction = async (parent, args) => {
  return await Task.find({
    assignedTo: args.userId,
  }).populate("bugs sprint assignedTo");
};

const createTaskFunction = async (parent, args) => {
  let newTask = new Task({
    name: args.type.name,
    status: args.type.status,
    assignedTo: args.type.assignedTo,
    description: args.type.description,
    sprint: args.type.sprint,
    bugs: args.type.bugs,
  });

  await Sprint.findByIdAndUpdate(args.type.sprint, {
    $push: {
      tasks: newTask.id,
    },
  });

  await newTask.save();
  return await Task.findById(newTask.id).populate("bugs sprint assignedTo");
};
const updateTaskFunction = async (parent, args) => {
  let newTask = new Task({
    name: args.type.name,
    status: args.type.status,
    assignedTo: args.type.assignedTo,
    description: args.type.description,
    sprint: args.type.sprint,
    bugs: args.type.bugs,
  });
  await Task.findByIdAndUpdate(args.taskId, {
    status: args.type.status,
    assignedTo: args.type.assignedTo,
    description: args.type.description,
    bugs: args.type.bugs,
  });
  return await Task.findById(args.taskId).populate("bugs sprint assignedTo");
};

const truncateTaskFunction = async (parent, args) => {
  await Sprint.findByIdAndUpdate(args.sprintId, {
    $pull: {
      tasks: args.taskId,
    },
  });
  return await Task.findByIdAndDelete(args.taskId).populate("bugs sprint assignedTo");
};

module.exports = {
  getTasks: getTasksFunction,
  createTask: createTaskFunction,
  updateTask: updateTaskFunction,
  truncateTask: truncateTaskFunction,
};
