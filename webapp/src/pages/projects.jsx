import React from 'react';

import { AppLayout } from '../components';
import ProjectList from '../features/ProjectsList';

const breadcrumb = ['Home', 'Projects'];

const ProjectsPage = () => {
  return (
    <AppLayout breadcrumb={breadcrumb}>
      <ProjectList />
    </AppLayout>
  );
};

export default ProjectsPage;
