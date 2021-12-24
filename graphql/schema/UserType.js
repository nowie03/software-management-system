const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const Project=require("../../schema/Project")

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "Represnets a User model",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    workedOn: {
      type: new GraphQLList(require("./ProjectType").ProjectType),
      resolve: async (userType) => {
        let res = await userType.workedOn.map(async project => { 
          //console.log("projcet id"+project)
          let res = await Project.findById(project).populate("leadId team modules")
          return res
        })
        
        return res;
      }
    },
    ledOn: {
      type: new GraphQLList(require("./ProjectType").ProjectType),
      resolve: async(projectType)=>{
        return await Project.findById(projectType).populate("leadId team modules");
      }  },
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
