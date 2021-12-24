const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const TaskType = require("./TaskType");
const ProjectType = require("./ProjectType").ProjectType;
const Module = require("../../schema/Module");
const Task = require("../../schema/Task");

const SprintType = new GraphQLObjectType({
  name: "SprintType",
  description: "Represents a sprint model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    startedAT: { type: GraphQLString },
    deadline: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLString) },
    tasks: {
      type: new GraphQLList(require("./TaskType").TaskType),
      resolve: async (sprintType) => {
        let res = await sprintType.tasks.map(async (task) => {
          return await Task.findById(task).populate("bugs sprint assignedTo");
        });
        return res;
      },
    },
    module: {
      type: new GraphQLNonNull(require("./ModuleType").ModuleType),
      resolve: async (sprintType) => {
        return await Module.findById(sprintType.module).populate(
          "activeSprint completedSprints upcomingSprints project"
        );
      },
    },
    project: { type: new GraphQLNonNull(ProjectType) },
  }),
});

module.exports.SprintType = SprintType;

//     type Sprint{
//         id:String
//         name:String
//         startedAt:String
//         deadline:String
//         status:String
//         tasks:[String]
//         module:Module
//         projectId:String
//     }
