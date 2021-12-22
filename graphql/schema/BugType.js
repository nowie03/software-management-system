const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const BugType = new GraphQLObjectType({
  name: "BugType",
  description: "Represents a bug model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    debuggedBy: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    task: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = BugType;

