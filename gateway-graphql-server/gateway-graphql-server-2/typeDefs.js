const { gql } = require("apollo-server");
module.exports.typeDefs = gql`
  type Query {
    me: [IDS]
  }

  type IDS {
    ids: String
  }
`;
