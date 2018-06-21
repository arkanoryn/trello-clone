import React from 'react';
import { Row } from 'antd';

import { AppLayout } from '../components';
import ProjectList from '../features/ProjectsList';


const ProjectsPage = () => {
  return (
    <AppLayout>
      <Row gutter={24}>
        <ProjectList />
      </Row>
    </AppLayout>
  );
};

export default ProjectsPage;
