import gql from 'graphql-tag';

const allColumnTickets = gql`
  query allColumnTickets($columnId: ID!) {
    allColumnTickets(columnId: $columnId) {
      id
      columnPosition
      description
      estimation
      name
      kind
      state
      tags
      column {
        id
      }
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

const buildUpdateTicketVariables = (variables) => {
  return ({
    id:           variables.id,
    ticketParams: {
      columnPosition: variables.columnPosition,
      description:    variables.description,
      estimation:     variables.estimation,
      kind:           variables.kind,
      name:           variables.name,
      state:          variables.state,
      tags:           variables.tags,
    },
  });
};

const updateTicket = gql`
  mutation updateTicket(
    $id: ID!, $ticketParams: TicketParams) {
    updateTicket(id: $id, ticketParams: $ticketParams) {
      id
      name
    }
  }
`;

export {
  allColumnTickets,
  buildUpdateTicketVariables,
  createTicket,
  updateTicket,
};
