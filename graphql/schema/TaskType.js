const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const SprintType = require("./SprintType").SprintType;
const UserType = require("./UserType");
const Sprint = require("../../schema/Sprint")
const Bug=require("../../schema/Bug")

const TaskType = new GraphQLObjectType({
  name: "TaskType",
  description: "Represnet a task model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    assignedTo: { type: new GraphQLNonNull( UserType) },
    bugs: {
      type: new GraphQLList(require("./BugType").BugType),
      resolve: async (taskType) => { 
        let res = taskType.bugs.map(async bug => { 
          return await Bug.findById(bug).populate("task debuggedBy");
        })
        return res;
      }  },
    sprint: {
      type: new GraphQLNonNull(SprintType),
      resolve: async (taskType) => { 
        return await Sprint.findById(TaskType.sprint).populate("module project tasks");
      } },
    description: { type: GraphQLString },
  }),
});

module.exports.TaskType = TaskType;

//     type Task{
//         id:String
//         name:String
//         status:String
//         assignedTo:String
//         bugs:[String]
//         sprint:String
//         description:String
//     }
