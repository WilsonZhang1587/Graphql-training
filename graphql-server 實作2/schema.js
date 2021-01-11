const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const fetchApiQuery = require("./fetchApi");
const { mongodbQuery, mongodbMutation } = require("./mongodb");

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...fetchApiQuery,
    ...mongodbQuery
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: { ...mongodbMutation }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
