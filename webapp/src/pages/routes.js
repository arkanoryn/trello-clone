import React from 'react';
import { renderRoutes } from 'react-router-config';

import { NewProjectPage, ProjectsPage, ProjectPage } from './';

const Root = ({ route }) => {
  return (
    <div>
      {/* child routes won't render without this */}
      {renderRoutes(route.routes)}
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

const routes = [
  {
    component: Root,
    routes:    [
      {
        path:      '/',
        exact:     true,
        component: Home,
      },
      {
        path:      '/projects/new',
        exact:     true,
        component: NewProjectPage,
      },
      {
        path:      '/projects/:id',
        component: ProjectPage,
      },
      {
        path:      '/projects',
        component: ProjectsPage,
      },
    ],
  },
];

export default routes;
