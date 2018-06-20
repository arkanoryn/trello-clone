import React from 'react';
import { Row, Col } from 'antd';
import { AppLayout, ProjectTile } from '../components';
import { hot } from 'react-hot-loader';

const GUTTER_SIZE = 32;
const XL_COL = 6;
const LG_COL = 8;
const MD_COL = 12;
const SM_COL = 12;

const projects = [
  { id: 1, name: "alpha", description: "first Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null, creator: { avatar: null } },
  { id: 2, name: "beta", description: "second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 3, name: "gamma", description: "third Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 4, name: "delta", description: "fourth Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 5, name: "epsilon", description: "fifth Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 6, name: "alpha", description: "first Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 7, name: "beta", description: "second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 8, name: "gamma", description: "third Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 9, name: "delta", description: "fourth Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
  { id: 10, name: "epsilon", description: "fifth Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis posuere dolor at molestie. Vestibulum convallis metus sit amet tortor vulputate, quis iaculis magna scelerisque. Quisque non ullamcorper orci. Nulla et malesuada risus, porttitor venenatis.", image: null },
]

const ProjectsPage = () => (
  <AppLayout>
    <Row gutter={GUTTER_SIZE}>
      {
        projects.map(project => (
          <Col key={project.id} sm={SM_COL} md={MD_COL} lg={LG_COL} xl={XL_COL} style={{ paddingBottom: GUTTER_SIZE }}>
            <ProjectTile {...project} />
          </Col>
        ))
      }
    </Row>
  </AppLayout>
);

export default hot(module)(ProjectsPage);