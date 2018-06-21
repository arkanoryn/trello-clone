import React from 'react';

import { AppLayout } from '../components';
import ProjectList from '../features/ProjectsList';


const ProjectsPage = () => {
  return (
    <AppLayout>
      <ProjectList />
    </AppLayout>
  );
};

export default ProjectsPage;
