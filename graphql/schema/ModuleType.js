const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const ProjectType = require("./ProjectType").ProjectType;
const SprintType = require("./SprintType").SprintType;
const Project = require("../../schema/Project")
const Sprint=require("../../schema/Sprint")

const ModuleType = new GraphQLObjectType({
  name: "ModuleType",
  description: "Represents a Module model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    stratedAt: { type: GraphQLString },
    endsAt: { type: GraphQLString },
    activeSprint: {
      type: SprintType,
      resolve: async (moduleType) => { 
        let res = await Sprint.findById(moduleType.activeSprint).populate("module project tasks");
        return res;
      }},
    completedSprints: {
      type: new GraphQLList(SprintType),
      resolve: async (moduleType) => { 
        let res = moduleType.completedSprints.map(async sprint => { 
          return await Sprint.findById(sprint).populate("module project tasks");
        })
      }},
    upcomingSprints: { type: new GraphQLList(SprintType),
      resolve: async (moduleType) => {
        let res = moduleType.completedSprints.map(async sprint => {
          return await Sprint.findById(sprint).populate("module project tasks");
        })
      }
    },
    project: {
      type: new GraphQLNonNull(ProjectType),
      resolve: async (moduleType) => {
        let res = await Project.findById(moduleType.project.id).populate("leadId team modules")
        return res;
      }},
  }),
});

module.exports.ModuleType = ModuleType ;

//     type Module{
//         id:String
//         name:String
//         startedAt:String
//         endsAt:String
//         activeSprint:String
//         completedSprints:[String]
//         upcomingSprints:[String]
//         projectId:String
//     }
