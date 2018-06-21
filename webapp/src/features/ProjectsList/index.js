import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Col, Row } from 'antd';

import { ProjectTile } from '../../components';

const GUTTER_SIZE = 32;
const XL_COL = 6;
const LG_COL = 8;
const MD_COL = 12;
const SM_COL = 12;

const query = gql`
      {
        allProjects {
          id
          name
          description
        }
      }
    `;

const ProjectList = ({ gutterSize = GUTTER_SIZE }) => {
  return (
    <Query query={query}>
      {
        ({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return (
            <Row gutter={gutterSize}>
              {
                data.allProjects.map((project) => {
                  return (
                    <Col
                      key={project.id}
                      sm={SM_COL}
                      md={MD_COL}
                      lg={LG_COL}
                      xl={XL_COL}
                      style={{ paddingBottom: gutterSize }}
                    >
                      <ProjectTile {...project} />
                    </Col>
                  );
                })
              }
            </Row>
          );
        }
      }
    </Query>
  );
};

export default ProjectList;
