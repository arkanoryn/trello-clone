import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { Row, Col } from 'antd';

import { AppLayout, ProjectTile, BoardTile } from '../../components';
import { boardQueries } from '../../apollo/queries';

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
  style:  {
    marginBottom: DEFAULT_GUTTER_SIZE,
  },
};

const ProjectPage = ({ data: { allBoards }, rowProps = DEFAULT_ROW_PROPS, colProps = DEFAULT_COL_PROPS }) => {
  return (
    <AppLayout>
      <Row {...rowProps}>
        <Col span={24}>
          <ProjectTile style={{}} />
        </Col>
      </Row>

      <Row {...rowProps}>
        {
          allBoards &&
          allBoards.map((board) => {
            return (
              <Col key={board.id} {...colProps}>
                <BoardTile {...board} />
              </Col>
            );
          })
        }
      </Row>
    </AppLayout>
  );
};

const mapDispatchToProps = {
  push: pushAction,
};

const enhance = compose(
  graphql(
    boardQueries.allBoards,
    {
      options: ({ match: { params } }) => {
        return {
          variables: {
            project_id: params.id,
          },
        };
      },
    },
  ),
  connect(null, mapDispatchToProps),
);

export default enhance(ProjectPage);
