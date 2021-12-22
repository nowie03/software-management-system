const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");

const BugInputType = new GraphQLInputObjectType({
  name: "BugInputType",
  description: "Input model for Bug creation mutation",
  fields: () => ({
    debuggedBy: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    task: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = BugInputType;
