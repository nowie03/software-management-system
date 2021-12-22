const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");
const SprintType = require("../SprintType");

const ModuleInputType = new GraphQLInputObjectType({
  name: "ModuleInputType",
  description: "Input model for Module creation mutation",
  fields: () => ({
    projectId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    startedAt: { type: GraphQLString },
    endsAt: { type: GraphQLString },
    activeSprint: { type: GraphQLString },
    completedSprints: { type: new GraphQLList(GraphQLString) },
    upComingSprints: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = ModuleInputType;
