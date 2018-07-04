import gql from 'graphql-tag';

const allColumnTickets = gql`
  query allColumnTickets($columnId: ID!) {
    allColumnTickets(columnId: $columnId) {
      id
      name
    }
  }
`;

const createTicket = gql`
  mutation createTicket(
    $boardId: ID!, $columnId: ID!, $columnPosition: Int!, $description: String!,
    $estimation: Int!, $name: String!, $kind: Int!, $state: Int!, $tags: String) {
    createTicket(boardId: $boardId, columnId: $columnId, columnPosition: $columnPosition,
      description: $description, estimation: $estimation, name: $name, kind: $kind, state: $state,
      tags: $tags) {
      id
      name
    }
  }
`;

const updateTicket = gql`
  mutation updateTicket(
    $id: ID!, $columnId: ID!, $columnPosition: Int!, $description: String!,
    $estimation: Int!, $name: String!, $kind: Int!, $state: Int!, $tags: String) {
    updateTicket(id: $id, columnId: $columnId, columnPosition: $columnPosition,
      description: $description, estimation: $estimation, name: $name, kind: $kind, state: $state,
      tags: $tags) {
      id
      name
    }
  }
`;

export {
  allColumnTickets,
  createTicket,
  updateTicket,
};
