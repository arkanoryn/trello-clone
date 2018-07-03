import gql from 'graphql-tag';

const createColumn = gql`
  mutation createColumn($name: String!, $wip_limit: Integer!, $position: Integer!, $board_id: Id!) {
    createColumn(name: $name, wip_limit: $wip_limit, position: $position, board_id: $board_id) {
      id
    }
  }
`;

const tmp = '';

export {
  createColumn,
  tmp,
};
