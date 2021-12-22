const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const SprintType = new GraphQLObjectType({
  name: "SprintType",
  description: "Represents a sprint model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    startedAT: { type: GraphQLString },
    deadline: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLString) },
    tasks: { type: new GraphQLList(GraphQLString) },
    module: { type: new GraphQLNonNull(GraphQLString) },
    projectId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = SprintType;

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
