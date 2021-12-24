const User = require("../../schema/User");

const getUserFunction = async (parent, args) => {
  //To-Do:auth using jwt
let user=await User.find({
    email: args.email,
    password: args.password
}).populate("workedOn ledOn")
  return user[0]
};

const createUserFunction = async (parent, args) => {

  let isUserExists = async (username) => {
    return await User.find({
      username: username,
    });
  };
  let isMailExists = async(email) => {
    return await User.find({
      email: email,
    });
  };

  let isUserExistsFlag = await isUserExists(args.username)[0];
  let isMailExistsFlag = await isMailExists(args.email)[0];

  console.log(isUserExistsFlag +"-"+isMailExistsFlag)

  if (isUserExistsFlag || isMailExistsFlag) return;

  let newUser = new User({
    username: args.username,
    email: args.email,
    password: args.password,
    workdOn: args.workedOn,
    ledOn: args.ledOn,
  });
  try {
    await newUser.save();
  } catch (error) {
    throw new Error("Unable to save to database");
  }
  console.log(newUser)
  return await User.findById(newUser.id).populate("workedOn ledOn");
};

const updateUserFunction = async (parent, args) => {
  let isUserExists = () => {
    User.findOne({
      username: args.username,
    });
  };

  if (!isUserExists) return;
  let newUser = new User({
    username: args.username,
    email: args.email,
    password: args.password,
    workdOn: args.workedOn,
    ledOn: args.ledOn,
  });
  try {
    await User.findOneAndReplace(
      {
        username: args.username,
      },
      {
        username: args.username,
        email: args.email,
        password: args.password,
        workdOn: args.workedOn,
        ledOn: args.ledOn,
      }
    );
  } catch (error) {
    throw new Error("Unable to update to database");
  }
  let res = await User.findById(args.userId).populate("workedOn ledOn");
  console.log(res);
  return res;
};

module.exports = {
  getUser: getUserFunction,
  createUser: createUserFunction,
  updateUser: updateUserFunction,
};
