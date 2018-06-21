import ApolloClient from 'apollo-boost';

const API_URL = process.env.API_URL || 'http://192.168.55.55:4000/api';

const client = new ApolloClient({
  uri: API_URL,
});

export default client;
