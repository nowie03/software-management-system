const { Mongoose } = require("mongoose");
const Project = require("../../schema/Project");
const User = require("../../schema/User");

const createKey = (projectName) => {
  let projectkey = "";
  projectName.split(" ").forEach((element) => {
    projectkey += element.toString().charAt(0);
  });
  return projectkey.toUpperCase();
};

const addProjectToUser = async (userId, projectId) => {
  await User.findOneAndUpdate(
    {
      id: userId,
    },
    {
      $push: {
        workedOn: projectId,
        ledOn: projectId,
      },
    }
  );
};

const removeProjectFromUser = async (userId, projectId) => {
  await User.findOneAndUpdate(
    {
      id: userId,
    },
    {
      $pull: {
        workedOn: projectId,
        ledOn: projectId,
      },
    }
  );
};

const getProjectFunction = async (parent, args) => {
  let project= await Project.findById(args.projectId,
  ).populate("leadId team modules");
  project.modules.forEach(module => { 
    //console.log(module)
  })
  return project;

  
};
const getProjectsFucntion = async (parent, args) => {
  let result = await User.findById(args.userId).populate("workedOn");
  console.log(result)
 return await result.workedOn.map(async project => await Project.findById(project.id).populate("leadId team modules"));
};

const createProjectFunction = async (parent, args) => {
  const isNamexists = async (name) => {
    let res=await Project.find({
      name: name,
    })
    return res[0];
  };
  const isNamexistsFlag =await isNamexists(args.type.name);
  ;
  console.log(isNamexistsFlag)
  if (isNamexistsFlag) return;

  let newProject = new Project({
    name: args.type.name,
    leadId: args.type.userId,
    key: createKey(args.type.name),
    team: args.type.team,
    modules: args.type.modules,
  });

  await addProjectToUser(args.type.userId, newProject.id);
  await newProject.save();
  return await Project.findById(newProject.id).populate("leadId team modules")
};

const truncateProjectFunction = async (parent, args) => {
  let result = await Project.findByIdAndDelete(args.projectId);
  await removeProjectFromUser(args.userId, args.projectId);
  console.log(result);
  return await Project.findById(result.id).populate("leadId team modules")
};
const renameProjectFunction = async (parent, args) => {
  let result = await Project.findByIdAndUpdate(
    args.projectId,
    {
      name: args.newName,
      key: createKey(args.newName),
    }
  );
  console.log(result);
  return await getProjectFunction(null, { projectId: args.projectId });
};

module.exports = {
  getProject: getProjectFunction,
  getProjects: getProjectsFucntion,
  createProject: createProjectFunction,
  truncateProject: truncateProjectFunction,
  renameProject: renameProjectFunction,
};
