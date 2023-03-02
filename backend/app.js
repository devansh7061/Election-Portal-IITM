const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const { GraphQLSchema } = require("graphql");
const graphQLSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const loginRouter = require("./routes/login");
const isAuth = require("./middleware/is-auth");
const csvRoutes = require("./routes/csvRoutes");
const app = express();
const txnRouter = require("./scripts/TxnApi.js");

app.use(bodyParser.json());

app.use(isAuth);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
  console.log("hi");
});
app.use("/", loginRouter);
app.use("/uploadCsv", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api", txnRouter);

mongoose
  .connect(
    `mongodb+srv://na20b007:na20b007@cluster0.gfde4.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });