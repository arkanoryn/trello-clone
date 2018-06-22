import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { Col, Row, Card, notification } from 'antd';

import { NewProjectForm } from '../../components';
import { projectQueries } from '../../apollo/queries';

// TODO: encapsulate it in a redux component
const handleError = (error) => {
  notification.error({
    duration:    0,
    message:     'An error occured :(',
    description: (error && error.message) || null,
  });
};

const NewProject = ({
  rowProps = {}, colProps = { span: 24 }, handleOnSubmit,
}) => {
  return (
    <Row {...rowProps}>
      <Col {...colProps}>
        <Card title="New project" >
          <NewProjectForm
            onSubmit={handleOnSubmit}
          />
        </Card>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = {
  push: pushAction,
};

const enhance = compose(
  graphql(projectQueries.createProject),
  connect(null, mapDispatchToProps),
  withHandlers({
    handleOnSubmit: ({ push, mutate }) => {
      return (variables) => {
        return mutate({
          variables,
          refetchQueries: [{ query: projectQueries.allProjects }],
        })
          .then(({ data: { createProject } }) => {
            notification.success({ message: `Project [${createProject.name}] successfully created.` });
            return push('/projects');
          })
          .catch((error) => { handleError(error); });
      };
    },
  }),
);

export default enhance(NewProject);
