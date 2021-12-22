const {
  GraphQLObjectType,
  GraphQLString,
   GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "Represnets a User model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    workedOn: { type: new GraphQLList(GraphQLString) },
    ledOn: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = UserType;

//type User{
//         id:String
//         username:String
//         email:String
//         password:String
//         workedOn:[String]
//         ledOn:[String]
//     }
