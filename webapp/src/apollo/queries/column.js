import gql from 'graphql-tag';

const allColumns = gql`
  query allColumns($board_id: ID!) {
    allColumns(board_id: $board_id) {
      id
      name
      wip_limit
      position
      tickets {
        id
        name
        columnPosition
      }
    }
  }
`;


const createColumn = gql`
  mutation createColumn($name: String!, $wip_limit: Integer!, $position: Integer!, $board_id: ID!) {
    createColumn(name: $name, wip_limit: $wip_limit, position: $position, board_id: $board_id) {
      id
    }
  }
`;

export {
  allColumns,
  createColumn,
};
