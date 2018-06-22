import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Col, Row } from 'antd';

import { ProjectTile, ProjectTileLoading, ProjectTileError } from '../../components';
import { projectQueries } from '../../apollo/queries';

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

const ProjectList = ({
  push, colProps = DEFAULT_COL_PROPS, rowProps = DEFAULT_ROW_PROPS, projectTileProps = {},
}) => {
  return (
    <Query query={projectQueries.allProjects}>
      {
        ({ loading, error, data }) => {
          if (loading) {
            return (
              <Row {...rowProps}>
                {
                  <Col span={24}>
                    <ProjectTileLoading />;
                  </Col>
                }
              </Row>
            );
          }
          if (error) {
            return <ProjectTileError error={error.message} />;
          }

          return (
            <Row {...rowProps}>
              {
                data.allProjects.map((project) => {
                  return (
                    <Col key={project.id} {...colProps}>
                      <ProjectTile
                        {...project}
                        {...projectTileProps}
                        goToProject={() => { push(`/projects/${project.id}`); }}
                      />
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

const mapDispatchToProps = {
  push: pushAction,
};

export default withRouter(connect(null, mapDispatchToProps)(ProjectList));
