import ApolloClient from 'apollo-boost';

const API_URL = process.env.API_URL || 'https://w5xlvm3vzz.lp.gql.zone/graphql';

const client = new ApolloClient({
  uri: API_URL,
});

export default client;
