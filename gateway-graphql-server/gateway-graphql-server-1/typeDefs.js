const { gql } = require("apollo-server");
module.exports.typeDefs = gql`
  type Query {
    gg: [DDD]
  }

  type DDD {
    ddd: String
  }
`;
