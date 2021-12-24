const Sprint = require("../../schema/Sprint");
const Module = require("../../schema/Module");

const setAsActiveSprintFunction = async (parent, args) => {
  await removeFromUpcomingSprintsFunction(parent, args);
  await Module.findByIdAndUpdate(args.moduleId, {
    activeSprint: args.sprintId,
  });
  return await Sprint.findById(args.sprintId).populate("module project tasks");
};

const addToCompletedSprintsFunction = async (parent, args) => {
  await Module.findByIdAndUpdate(args.moduleId, {
    $push: {
      completedSprints: args.sprintId,
    },
    activeSprint: null,
  });
  return await Sprint.findById(args.sprintId).populate("module project tasks");
};

const addToUpcomingSprintsFunction = async (parent, args) => {
  await Module.findByIdAndUpdate(args.moduleId, {
    $push: {
      upcomingSprints: args.sprintId,
    },
  });
  return await Sprint.findById(args.sprintId).populate("module project tasks");
};

const removeFromUpcomingSprintsFunction = async (parent, args) => {
  await Module.findByIdAndUpdate(args.moduleId, {
    $pull: {
      upcomingSprints: args.sprintId,
    },
  });
  return await Sprint.findById(args.sprintId).populate("module project tasks");
};

const getActiveSprintFunction = async (parent, args) => {
  let module = await Module.findById(args.moduleId).populate(
    "activeSprint completedSprints upcomingSprints project"
  );
  console.log(module.activeSprint.id);
  return await Sprint.findById(module.activeSprint.id).populate(
    "module project tasks"
  );
};

const getSprintFunction = async (parent, args) => {
  let module = await Module.findById(args.moduleId).populate(
    "activeSprint upcomingSprints completedSprints"
  );

  if (module.activeSprint.id === args.sprintId) {
    let sprint = await Sprint.findById(module.activeSprint.id).populate(
      "module project tasks"
    );
    console.log(sprint);
    return sprint;
  }
  let resSprint = null;

  if (module.completedSprints) {
    let res = module.completedSprints.filter(
      (sprint) => args.sprintId === sprint.id
    );
    if (res.length > 0)
      return Sprint.findById(res[0].id).populate("module project tasks");
  }

  if (module.upcomingSprints) {
    let res = module.upcomingSprints.filter(
      (sprint) => args.sprintId === sprint.id
    );
    console.log(res);
    if (res.length > 0)
      return await Sprint.findById(res[0].id).populate("module project tasks");
  }
  return resSprint;
};

const createSprintFunction = async (parent, args) => {
  let newSprint = new Sprint({
    name: args.type.name,
    project: args.type.project,
    startedAt: args.type.startedAt,
    deadline: args.type.deadline,
    tasks: args.type.tasks,
    module: args.type.module,
  });

  await addToUpcomingSprintsFunction(parent, {
    moduleId: args.type.module,
    sprintId: newSprint.id,
  });
  console.log(newSprint.id);
  newSprint.save();
  console.log(
    await Sprint.findById(newSprint.id).populate("module project tasks")
  );
  return await Sprint.findById(newSprint.id).populate("module project tasks");
};

const updateSprintFunction = async (parent, args) => {
  await Sprint.findByIdAndUpdate(args.sprintId, {
    startedAt: args.type.startedAt,
    deadline: args.type.deadline,
    tasks: args.type.tasks,
  });

  return Sprint.findById(args.sprintId).populate("module project tasks");
};

const migrateTasksFromSprint = async (moduleId, currentSprintId) => {
  let upcomingSprints = await getUpcomingSprintsFunction(null, {
    moduleId: moduleId,
  });
  let currentSprint = await getSprintFunction(null, {
    moduleId: moduleId,
    sprintId: currentSprintId,
  });
  if (currentSprint.tasks.length > 0 && upcomingSprints.length > 0)
    Sprint.findByIdAndUpdate(upcomingSprints[0].id, {
      $push: {
        tasks: currentSprint.tasks,
      },
    });
};

const truncateSprintFunction = async (parent, args) => {
  if (args.shouldMigrateTasks.toLowerCase() === "true") {
    migrateTasksFromSprint(args.moduleId, args.sprintId);
  }
  return await Sprint.findByIdAndDelete(args.sprintId).populate(
    "module project tasks"
  );
};

const getCompletedSprintsFunction = async (parent, args) => {
  let module = await Module.findById(args.moduleId);
  return module.completedSprints.map(async (sprint) => {
    return await Sprint.findById(sprint).populate("module project tasks");
  });
};

const getUpcomingSprintsFunction = async (parent, args) => {
  let module = await Module.findById(args.moduleId);

  let res = module.upcomingSprints.map(async (sprint) => {
    return await Sprint.findById(sprint).populate("module project tasks");
  });

  console.log(res);

  return res;

  //console.log(module.upcomingSprints)
};

module.exports = {
  getActiveSprint: getActiveSprintFunction,
  getSprint: getSprintFunction,
  createSprint: createSprintFunction,
  updateSprint: updateSprintFunction,
  getUpcomingSprints: getUpcomingSprintsFunction,
  getCompletedSprints: getCompletedSprintsFunction,
  setAsActiveSprint: setAsActiveSprintFunction,
  addToCompletedSprints: addToCompletedSprintsFunction,
  addToUpcomingSprints: addToUpcomingSprintsFunction,
  removeFromUpcomingSprints: removeFromUpcomingSprintsFunction,
  truncateSprint: truncateSprintFunction,
};
