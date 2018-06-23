import gql from 'graphql-tag';

const allBoards = gql`
  query allBoards($project_id: ID!) {
    allBoards (project_id: $project_id) {
      id
      name
      description
      project {
        id
        name
        description
      }
    }
  }
`;

const tmp = '';

export {
  allBoards,
  tmp,
};
