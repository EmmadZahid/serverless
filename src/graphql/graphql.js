// graphql.js

// const { ApolloServer, gql } = require("apollo-server-lambda");
import { graphqlLambda, gql, graphiqlLambda } from "apollo-server-lambda";
import { makeExecutableSchema } from "graphql-tools";

// Construct a schema, using GraphQL schema language
const schema = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const myGraphQLSchema = makeExecutableSchema({ 
  typeDefs: schema,
  resolvers
});
// const server = new ApolloServer({ schema, resolvers });

// exports.graphqlHandler = server.createHandler();


exports.graphqlHandler = function graphqlHandler(event, context, callback) {
    function callbackWithHeaders(error, output) {
      // eslint-disable-next-line no-param-reassign
      output.headers['Access-Control-Allow-Origin'] = '*';
      callback(error, output);
    }
  
    const handler = graphqlLambda({ schema: myGraphQLSchema });
    return handler(event, context, callbackWithHeaders);
  };
