const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");
//const ModuleType = require("./ModuleType").ModuleType;
const UserType = require("./UserType");
const User = require("../../schema/User")
const Module=require("../../schema/Module")

const ProjectType = new GraphQLObjectType({
  name: "ProjectType",
  description: "Represents a  Project Model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    key: { type: GraphQLString },
    leadId: {
      type: new GraphQLNonNull(UserType),
      resolve: async (projectType) => {
        console.log(projectType)
        let res = await User.findById(projectType.leadId.id).populate("workedOn ledOn");
        return res;
    }},
    modules: {
      type: new GraphQLList(require("./ModuleType").ModuleType),
      resolve: async(projectType) =>{
        let res = projectType.modules.map(async (module) => { 
          let res = await Module.findById(module.id).populate("activeSprint completedSprints upcomingSprints project")
          return res;
        })
        return res;
      }},
    team: {
      type: new GraphQLList(UserType),
      resolve: async(projectType) =>{
        return await User.findById(projectType.leadId.id).populate("workedOn ledOn");
      }},
  }),
});

module.exports.ProjectType = ProjectType;
//     type Project{
//         id:String
//         name:String
//         key:String
//         leadId:String
//         team:[String]
//         modules:[String]

//     }
