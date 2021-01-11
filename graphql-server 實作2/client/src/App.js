import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Launches from "./components/Launches";
import Launch from "./components/Launch";
import Update from "./components/Update";
import "./App.css";
import logo from "./logo.jpg";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  onError: e => {
    console.log(e.graphQLErrors);
  }
  // uri: "/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 500, display: "block", margin: "auto" }}
          />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
          <Route exact path="/update" component={Update} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
