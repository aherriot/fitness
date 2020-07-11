const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const db = require("./db");
const config = require("./config.json");

const apolloServer = new ApolloServer({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolvers,
  context: ({ req }) => {
    let user;
    let token = req.headers.authorization;
    if (token) {
      token = token.replace("Bearer ", "");

      // verifies secret and checks exp
      jwt.verify(token, config.jwtSecret, function (err, decoded) {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return;
            // return respondWithError(res, "TokenExpiredError");
          } else {
            return;
            // return respondWithError(res, "JsonWebTokenError");
          }
        }

        user = {
          id: decoded.id,
          username: decoded.username,
        };
      });
    }
    return { user };
  },
});

const app = express();
apolloServer.applyMiddleware({ app });

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

async function start() {
  await db.verifyConnection();
  console.log("DB connection verified");

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(
      `Server succesfully started on port ${PORT} with NODE_ENV=${process.env.NODE_ENV}.`
    );
  });
}

start();
