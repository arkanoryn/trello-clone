import gql from 'graphql-tag';

const allColumns = gql`
  query allColumns($boardId: ID!) {
    allColumns(boardId: $boardId) {
      id
      name
      wipLimit
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
  mutation createColumn($name: String!, $wipLimit: Int!, $position: Int!, $boardId: ID!) {
    createColumn(name: $name, wipLimit: $wipLimit, position: $position, boardId: $boardId) {
      id
      name
    }
  }
`;

export {
  allColumns,
  createColumn,
};
