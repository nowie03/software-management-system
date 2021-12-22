const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema({
  username: String,
  email: String,
  password: String,
  workedOn: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  ledOn: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
