const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const Schema = require("./graphql/schema/index");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
);

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
