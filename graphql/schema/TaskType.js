const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const TaskType = new GraphQLObjectType({
  name: "TaskType",
  description: "Represnet a task model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    bugs: { type: new GraphQLList(GraphQLString) },
    sprint: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  }),
});

module.exports = TaskType;

//     type Task{
//         id:String
//         name:String
//         status:String
//         assignedTo:String
//         bugs:[String]
//         sprint:String
//         description:String
//     }
