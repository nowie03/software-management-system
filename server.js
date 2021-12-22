const express = require("express");
const mongoose = require("mongoose");
const Bug = require("./schema/Bug");
const Module = require("./schema/Module");
const Project = require("./schema/Project");
const Sprint = require("./schema/Sprint");
const Task = require("./schema/Task");
const User = require("./schema/User");

const app = express();

app.get("/", (req, res) => {
    
    res.send("done")
});

mongoose
  .connect(
    `mongodb+srv://hackaholics4:${process.env.MONGO_PASSWORD}@cluster0.gbiev.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(process.env.port);
  })
  .catch((err) => {
    throw Error("Unable to connect " + err);
  });
