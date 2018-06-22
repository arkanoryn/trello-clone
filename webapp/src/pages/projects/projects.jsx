import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { Button, Tooltip } from 'antd';

import { AppLayout } from '../../components';
import ProjectList from '../../features/ProjectsList';

const goToNewProject = (push) => {
  return (push('/projects/new'));
};

const NewProjectButton = ({ push }) => {
  return (
    <Tooltip title="New project">
      <Button
        icon="plus"
        onClick={() => { goToNewProject(push); }}
        type="primary"
        style={{ float: 'right', marginTop: -64 }}
      >
        New project
      </Button>
    </Tooltip>
  );
};

const ProjectsPage = ({ push }) => {
  return (
    <AppLayout>
      <NewProjectButton push={push} />

      <ProjectList />
    </AppLayout>
  );
};

const mapDispatchToProps = {
  push: pushAction,
};

export default withRouter(connect(null, mapDispatchToProps)(ProjectsPage));
