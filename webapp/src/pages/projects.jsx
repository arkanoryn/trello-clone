import React from 'react';
import { Row, Col } from 'antd';
import { AppLayout, ProjectTile } from '../components';

const GUTTER_SIZE = 16;

const projects = [
  { id: 1, name: "alpha", description: "first project", image: null, creator: { avatar: null } },
  { id: 2, name: "beta", description: "second project", image: null },
  { id: 3, name: "gamma", description: "third project", image: null },
  { id: 4, name: "delta", description: "fourth project", image: null },
  { id: 5, name: "epsilon", description: "fifth project", image: null },
  { id: 6, name: "alpha", description: "first project", image: null },
  { id: 7, name: "beta", description: "second project", image: null },
  { id: 8, name: "gamma", description: "third project", image: null },
  { id: 9, name: "delta", description: "fourth project", image: null },
  { id: 10, name: "epsilon", description: "fifth project", image: null },
]

const ProjectsPage = () => (
  <AppLayout>
    <Row gutter={GUTTER_SIZE}>
      {
        projects.map(project => (
          <Col key={project.id} sm={12} md={12} lg={8} xl={6} style={{ paddingBottom: GUTTER_SIZE }}>
            <ProjectTile {...project} />
          </Col>
        ))
      }
    </Row>
  </AppLayout>
);

export default ProjectsPage;
      // projects.map(project => (<ProjectTile
      //   name={project.name}
      //   description={project.description}
      //   imageSrc={project.image}
            // <ProjectTile name={project.name} description={project.description} image={project.image} />