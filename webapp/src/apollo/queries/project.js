import gql from 'graphql-tag';

const getProject = gql`
  query getProject($id: ID!) {
    getProject (id: $id) {
      id
      name
      description
    }
  }
`;

const allProjects = gql`
  {
    allProjects {
      id
      name
      description
    }
  }
`;

const createProject = gql`
  mutation createProject($name: String!, $description: String!) {
    createProject(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export {
  allProjects,
  createProject,
  getProject,
};
