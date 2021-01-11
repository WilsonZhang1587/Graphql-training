import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const UPDATE_MONGODB = gql`
  mutation($ddd: String!, $data: tttIn!) {
    mongodbRootMutationUpdateOne_2(ddd: $ddd, data: $data) {
      ddd
      data {
        ttt
      }
    }
  }
`;

const LAUNCHES_QUERY = gql`
  query {
    mongodb {
      id
      ddd
      data {
        ttt
      }
    }
  }
`;

export class Update extends Component {
  state = {
    state: {}
  };
  render() {
    return (
      <Fragment>
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <Fragment>
                {data.mongodb.map(item => (
                  <p key={item.id}>{item.data.ttt}</p>
                ))}
              </Fragment>
            );
          }}
        </Query>
        <Mutation
          mutation={UPDATE_MONGODB}
          refetchQueries={() => {
            return [{ query: LAUNCHES_QUERY }];
          }}
        >
          {(change, { data }) => {
            // 生成 => 從無到有
            return (
              <Fragment>
                <button
                  onClick={e => {
                    e.preventDefault();
                    change({
                      variables: { ddd: "02", data: { ttt: "eee" } }
                    });
                  }}
                >
                  切
                </button>
              </Fragment>
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

export default Update;
