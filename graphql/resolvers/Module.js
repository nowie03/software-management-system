const e = require("express");
const { findOneAndUpdate } = require("../../schema/Module");
const Module = require("../../schema/Module");
const Project = require("../../schema/Project");

const addModuleToProject = async (projectId, moduleId) => {
  return await Project.findByIdAndUpdate(projectId, {
    $push: {
      modules: moduleId,
    },
  });
};

const removeModuleFromProject = async (projectId, moduleId) => {
  return await Project.findByIdAndUpdate(projectId, {
    $pull: {
      modules: moduleId,
    },
  });
};

const getModuleFunction = async (parent, args) => {
  let res = await Project.findById(args.projectId).populate("modules");
  //console.log(res.modules)
  let resModule = null;
  res.modules.forEach((module) => {
    if (module.id === args.moduleId) resModule = module;
  });
  console.log(resModule);
  return resModule
    ? await Module.findById(resModule.id).populate(
        "activeSprint completedSprints upcomingSprints project"
      )
    : resModule;
};
const getModulesFucntion = async (parent, args) => {
  let res = await Project.findById(args.projectId).populate("modules");

  return await res.modules.map(
    async (module) =>
      await Module.findById(module.id).populate(
        "activeSprint completedSprints upcomingSprints project"
      )
  );
};
const createModuleFunction = async (parent, args) => {
  let newModule = new Module({
    name: args.type.name,
    startedAt: args.type.stratedAt,
    endsAt: args.type.endsAt,
    activeSprint: args.type.activeSprint,
    completedSprints: args.type.completedSprints,
    upcomingSprints: args.type.upcomingSprints,
    project: args.type.project,
  });
  await addModuleToProject(args.type.project, newModule.id);
  await newModule.save();
  console.log(newModule)

  return Module.findById(newModule.id).populate(
    "activeSprint completedSprints upcomingSprints project"
  );
};
const truncateModuleFunction = async (parent, args) => {
  await removeModuleFromProject(args.projectId, args.moduleId);
  return await Module.findByIdAndDelete(args.moduleId).populate(
    "activeSprint completedSprints upcomingSprints project"
  );
};
const updateModuleFunction = async (parent, args) => {
  let newModule = new Module({
    name: args.type.name,
    startedAt: args.type.stratedAt,
    endsAt: args.type.endsAt,
    activeSprint: args.type.activeSprint,
    completedSprints: args.type.completedSprints,
    upcomingSprints: args.type.upcomingSprints,
    project: args.type.projectId,
  });

  await Module.findByIdAndUpdate(
    args.moduleId,
    {
      name: args.type.name,
      startedAt: args.type.stratedAt,
      endsAt: args.type.endsAt,
      activeSprint: args.type.activeSprint,
      completedSprints: args.type.completedSprints,
      upcomingSprints: args.type.upcomingSprints,
    }
  );

  return Module.findById(args.moduleId).populate(
    "activeSprint completedSprints upcomingSprints project"
  );
};

module.exports = {
  getModule: getModuleFunction,
  getModules: getModulesFucntion,
  createModule: createModuleFunction,
  truncateModule: truncateModuleFunction,
  updateModule: updateModuleFunction,
};
