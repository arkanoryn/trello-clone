import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Tooltip } from 'antd';

const { Meta } = Card;

const DEFAULT_STYLE = {
  height:       400,
  textOverflow: 'ellipsis',
  whiteSpace:   'pre-line',
  overflow:     'hidden',
};

// const goToEditProject = (id) => {
//   console.log(`go to edit project: ${id}`);
// };

// const goToProjectSettings = (id) => {
//   console.log(`go to project settings: ${id}`);
// };

const BoardTile = ({
  id, name, description, style = DEFAULT_STYLE, goToBoard = () => { },
}) => {
  return (
    <Card
      hoverable
      className="board-card"
      bordered={false}
      title={name}
      extra={<Icon type="ellipsis" />}
      style={style}
    >
      <Tooltip title={description}>
        <Meta
          description={description}
          onClick={() => { return goToBoard(id); }}
        />
      </Tooltip>
    </Card >
  );
};

export default withRouter(BoardTile);
