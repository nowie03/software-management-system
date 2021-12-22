const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");
const ModuleType = require("../ModuleType");
const UserType = require("../UserType");

const ProjectInputType = new GraphQLInputObjectType({
  name: "ProjectInputType",
  description: "Input model for project creation mutation",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    team: { type: new GraphQLList(GraphQLString) },
    modules: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = ProjectInputType;
