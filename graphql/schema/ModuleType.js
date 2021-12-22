const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const ModuleType = new GraphQLObjectType({
  name: "ModuleType",
  description: "Represents a Module model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    stratedAt: { type: GraphQLString },
    endsAt: { type: GraphQLString },
    activeSprint: { type: new GraphQLNonNull(GraphQLString) },
    completedSprints: { type: new GraphQLList(GraphQLString) },
    upcomingSprints: { type: new GraphQLList(GraphQLString) },
    projectID: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = ModuleType;

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
