import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    datas: [Test!]!
  }
  type Test {
    id: ID!
    data: Qwe
  }
  type Qwe {
    ttt: String!
  }
  type Mutation {
    createTest(data: String!): Test!
  }
`;
