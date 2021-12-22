const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");

const TaskType = require("../TaskType");

const SprintInputType = new GraphQLInputObjectType({
  name: "SprintInputType",
  description: "Input model for Sprint creation mutation",
  fields: () => ({
    projectId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    startedAt: { type: GraphQLString },
    deadline: { type: GraphQLString },
    module: { type: GraphQLString },
    tasks: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = SprintInputType;
