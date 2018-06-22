import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { Button, Tooltip } from 'antd';

import { AppLayout } from '../../components';
import ProjectList from '../../features/ProjectsList';

const breadcrumb = ['Home', 'Projects'];

const goToNewProject = (push) => {
  return (push('/projects/new'));
};

const createProjectButton = (push) => {
  return (
    <Tooltip title="New project">
      <Button
        icon="plus"
        onClick={() => { goToNewProject(push); }}
        shape="circle"
        size="large"
        type="primary"
      />
    </Tooltip>
  );
};

const ProjectsPage = ({ push }) => {
  return (
    <AppLayout breadcrumb={breadcrumb} actions={createProjectButton(push)}>
      <ProjectList />
    </AppLayout>
  );
};

const mapDispatchToProps = {
  push: pushAction,
};

export default withRouter(connect(null, mapDispatchToProps)(ProjectsPage));
