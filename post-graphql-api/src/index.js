import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true
  });

  app.listen({ port: 5000 }, () =>
    console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
  );
};

startServer();
