const BugResolver = require("./Bug");
const ModuleResolver = require("./Module");
const ProjectResolver = require("./Project");
const SprintResolver = require("./Sprint");
const TaskResolver = require("./Task");
const UserResolver = require("./user");

Module.exports = {
  ...BugResolver,
  ...ModuleResolver,
  ...ProjectResolver,
  ...SprintResolver,
  ...TaskResolver,
  ...UserResolver,
};
