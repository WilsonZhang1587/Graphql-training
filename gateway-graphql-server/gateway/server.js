const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "gr4001", url: "http://localhost:4001/graphql" },
    { name: "gr4002", url: "http://localhost:4002/graphql" }
    // List of federation-capable GraphQL endpoints...
  ]
});

// const server = new ApolloServer({ gateway, subscriptions: false });
(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  server.listen({ port: 4003 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
