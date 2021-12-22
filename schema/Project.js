const Mongoose = require("mongoose");

const projectSchema = Mongoose.Schema({
  name: String,
  key: String,
  leadId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  team: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  modules: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
});

const Project = Mongoose.model("Project", projectSchema);

module.exports = Project;
