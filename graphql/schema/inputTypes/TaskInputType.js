const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");

const BugType = require("../BugType");

const TaskInputType = new GraphQLInputObjectType({
  name: "TaskInputType",
  description: "Input model for Task creation mutation",
  fields: () => ({
    assignedTo: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: {type:GraphQLString },
    sprint: { type: new GraphQLNonNull(GraphQLString) },
    bugs: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = TaskInputType;
