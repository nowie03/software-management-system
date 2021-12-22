const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const ProjectType = new GraphQLObjectType({
  name: "ProjectType",
  description: "Represents a  Project Model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    key: { type: GraphQLString },
    leadId: { type: new GraphQLNonNull(GraphQLString) },
    team: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    modules: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  }),
});

module.exports = ProjectType;
//     type Project{
//         id:String
//         name:String
//         key:String
//         leadId:String
//         team:[String]
//         modules:[String]

//     }
