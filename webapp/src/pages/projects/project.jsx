import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

const goToBoard = (push, project_id, board_id) => {
  console.log('goToBoard', project_id, board_id);
  push(`/projects/${project_id}/boards/${board_id}`);
};

const ProjectPage = ({
  data: { allBoards }, rowProps = DEFAULT_ROW_PROPS, colProps = DEFAULT_COL_PROPS, push,
}) => {
  const project = (allBoards && allBoards[0] && allBoards[0].project) || {};
  const breadcrumbItems = {
    1: project,
  };

  return (
    <AppLayout breadcrumbItems={breadcrumbItems}>
      <Row {...rowProps}>
        <Col span={24}>
          <ProjectTile {...project} style={{}} />
        </Col>
      </Row>

      <Row {...rowProps}>
        {
          allBoards &&
          allBoards.map((board) => {
            return (
              <Col key={board.id} {...colProps}>
                <BoardTile
                  {...board}
                  goToBoard={(id) => { return goToBoard(push, project.id, id); }}
                />
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
  graphql(boardQueries.allBoards, {
    options: ({ match: { params } }) => {
      return {
        name:      'board',
        variables: {
          project_id: params.id,
        },
      };
    },
  }),
  connect(null, mapDispatchToProps),
);

export default enhance(withRouter(ProjectPage));
