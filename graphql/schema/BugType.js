const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
} = require("graphql");
const TaskType = require("./TaskType").TaskType;
const UserType = require("./UserType");
const Task=require("../../schema/Task")

const BugType = new GraphQLObjectType({
  name: "BugType",
  description: "Represents a bug model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    debuggedBy: { type: new GraphQLNonNull(UserType) },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    task: {
      type: new GraphQLNonNull(TaskType),
      resolve: async (bugType) => { 
        return await Task.findById(bugType.task).populate("bugs sprint assignedTo");
      }
    },
  }),
});

module.exports.BugType = BugType;

