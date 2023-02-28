const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const { GraphQLSchema } = require("graphql");
const graphQLSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const loginRouter = require("./routes/login");
const isAuth = require("./middleware/is-auth");
const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );
  if (req.method === 'OPTIONS' ) {
    return res.sendStatus(200);
  }
  next();
})
app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
)

app.get("/", (req, res, next) => {
    res.send("Hello World!");
    console.log("hi");
});
app.use("/", loginRouter)

mongoose
  .connect(
    `mongodb://ds:na20b016@ac-26uy7sd-shard-00-00.m45ofac.mongodb.net:27017,ac-26uy7sd-shard-00-01.m45ofac.mongodb.net:27017,ac-26uy7sd-shard-00-02.m45ofac.mongodb.net:27017/?ssl=true&replicaSet=atlas-ztv0lj-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });