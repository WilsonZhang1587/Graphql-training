const connect = require("connect");
const { ApolloServer, gql } = require("apollo-server-express");
const query = require("qs-middleware");
const fetch = require("node-fetch");
// const axios = require("axios");

const globalTunnel = require("global-tunnel-ng");

// 設立 開發環境 & 生產環境
globalTunnel.initialize({
  host: "192.168.201.201",
  port: 3128,
  sockets: 50 // optional pool size for each http and https
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    userId: Int
    id: Int
    title: String
    body: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => {
      let data = fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => data);
      return data;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = connect();
const path = "/graphql";

app.use(query());
server.applyMiddleware({ app, path });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
