import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Col, Row } from 'antd';

import { ProjectTile } from '../../components';

const XL_COL = 6;
const LG_COL = 8;
const MD_COL = 12;
const SM_COL = 12;

const DEFAULT_GUTTER_SIZE = 32;
const DEFAULT_STYLE = { gutterSize: DEFAULT_GUTTER_SIZE, paddingBottom: DEFAULT_GUTTER_SIZE };

const DEFAULT_COL_PROPS = {
  sm:    SM_COL,
  md:    MD_COL,
  lg:    LG_COL,
  xl:    XL_COL,
  style: DEFAULT_STYLE,
};

const DEFAULT_ROW_PROPS = {
  gutter: DEFAULT_GUTTER_SIZE,
};

const query = gql`
      {
        allProjects {
          id
          name
          description
        }
      }
    `;

const ProjectList = ({ colProps = DEFAULT_COL_PROPS, rowProps = DEFAULT_ROW_PROPS, projectTileProps = {} }) => {
  return (
    <Query query={query}>
      {
        ({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return (
            <Row {...rowProps}>
              {
                data.allProjects.map((project) => {
                  return (
                    <Col key={project.id} {...colProps}>
                      <ProjectTile {...project} {...projectTileProps} />
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
