import React from 'react';
import { Button, Tooltip } from 'antd';

import { AppLayout } from '../components';
import ProjectList from '../features/ProjectsList';

const breadcrumb = ['Home', 'Projects'];
const createProjectButton = (
  <Tooltip title="New project"><Button type="primary" icon="plus" size="large" shape="circle" /></Tooltip>
);

const ProjectsPage = () => {
  return (
    <AppLayout breadcrumb={breadcrumb} actions={createProjectButton}>
      <ProjectList />
    </AppLayout>
  );
};

export default ProjectsPage;
