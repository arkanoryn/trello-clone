import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Col, Row, Card } from 'antd';

import { NewProjectForm } from '../../components';

const mutation = gql`
  mutation createProject($name: String!, $description: String!) {
    createProject(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

const handleSubmit = (variables, createProject) => {
  createProject({ variables });
};

const NewProject = ({ rowProps = {}, colProps = { span: 24 } }) => {
  return (
    <Mutation mutation={mutation}>
      {
        (createProject, res) => {
          return (
            <Row {...rowProps}>
              <Col {...colProps}>
                <Card title="New project">
                  <NewProjectForm onSubmit={(values) => { handleSubmit(values, createProject); }} />
                </Card>
              </Col>
            </Row>
          );
        }
      }
    </Mutation>
  );
};

export default NewProject;
