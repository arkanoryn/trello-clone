import gql from 'graphql-tag';

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
};
