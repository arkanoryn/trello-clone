import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Col, Row, Card, notification } from 'antd';

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

const submitSuccessful = (push) => {
  // TODO: add a notification success?
  push('/projects');
};

// TODO: encapsulate it in a redux component
const handleError = (error) => {
  notification.error({
    duration:    0,
    message:     'An error occured :(',
    description: error.message,
  });
};

const handleSubmit = (variables, createProject) => {
  createProject({ variables });
};

const NewProject = ({ rowProps = {}, colProps = { span: 24 }, push }) => {
  return (
    <Mutation mutation={mutation}>
      {
        (createProject, { loading, error, data }) => {
          if (data) {
            return submitSuccessful(push);
          }

          if (error) {
            handleError(error);
          }

          return (
            <Row {...rowProps}>
              <Col {...colProps}>
                <Card title="New project" >
                  <NewProjectForm
                    onSubmit={(values) => { handleSubmit(values, createProject); }}
                    loading={loading}
                  />
                </Card>
              </Col>
            </Row>
          );
        }
      }
    </Mutation>
  );
};

const mapDispatchToProps = {
  push: pushAction,
  handleError,
};

export default withRouter(connect(null, mapDispatchToProps)(NewProject));
