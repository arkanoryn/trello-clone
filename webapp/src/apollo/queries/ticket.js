import gql from 'graphql-tag';

const allColumnTickets = gql`
  query allColumnTickets($columnId: ID!) {
    allColumnTickets(columnId: $columnId) {
      id
      name
    }
  }
`;

const createTicket = 'TODO';

export {
  allColumnTickets,
  createTicket,
};
