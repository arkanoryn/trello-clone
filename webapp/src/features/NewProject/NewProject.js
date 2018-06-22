import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { Col, Row, Card, notification } from 'antd';

import { NewProjectForm } from '../../components';
import { projectQueries } from '../../apollo/queries';
import {
  startLoading as startLoadingAction,
  endLoading as endLoadingAction,
} from './reducer';

// TODO: encapsulate it in a redux component
const handleError = (error) => {
  notification.error({
    duration:    0,
    message:     'An error occured :(',
    description: (error && error.message) || null,
  });
};

const NewProject = ({
  rowProps = {}, colProps = { span: 24 }, handleOnSubmit, isLoading,
}) => {
  return (
    <Row {...rowProps}>
      <Col {...colProps}>
        <Card title="New project" >
          <NewProjectForm
            onSubmit={handleOnSubmit}
            loading={isLoading}
          />
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ projects: { newProject } }) => {
  return ({
    isLoading: newProject.isLoading,
  });
};

const mapDispatchToProps = {
  push:         pushAction,
  startLoading: startLoadingAction,
  endLoading:   endLoadingAction,
};

const enhance = compose(
  graphql(projectQueries.createProject),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleOnSubmit: ({
      push, mutate, startLoading, endLoading,
    }) => {
      return (variables) => {
        startLoading();

        return mutate({
          variables,
          refetchQueries: [{ query: projectQueries.allProjects }],
        })
          .then(({ data: { createProject } }) => {
            endLoading();
            notification.success({ message: `Project [${createProject.name}] successfully created.` });
            return push('/projects');
          })
          .catch((error) => {
            endLoading();
            handleError(error);
          });
      };
    },
  }),
);

export default enhance(NewProject);
