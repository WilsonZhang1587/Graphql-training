const fetch = require("node-fetch");
const globalTunnel = require("global-tunnel-ng");

globalTunnel.initialize({
  host: "192.168.201.201",
  port: 3128,
  sockets: 50 // optional pool size for each http and https
});

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        let data = fetch("https://api.spacexdata.com/v3/launches")
          .then(res => res.json())
          .then(data => data);
        return data;
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then(res => res.json())
          .then(data => data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        let data = fetch("https://api.spacexdata.com/v3/rockets")
          .then(res => res.json())
          .then(data => data);
        return data;
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return fetch(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.json())
          .then(data => data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
