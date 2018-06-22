import React from 'react';
import { Card, Icon, Tooltip } from 'antd';

const { Meta } = Card;

const DEFAULT_STYLE = {
  height:       400,
  textOverflow: 'ellipsis',
  whiteSpace:   'pre-line',
  overflow:     'hidden',
};

const goToBoard = (id) => {
  console.log(`go to project: ${id}`);
};

// const goToEditProject = (id) => {
//   console.log(`go to edit project: ${id}`);
// };

// const goToProjectSettings = (id) => {
//   console.log(`go to project settings: ${id}`);
// };

const BoardTile = ({
  id, name, description, style = DEFAULT_STYLE,
}) => {
  return (
    <Card
      hoverable
      className="project-card"
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

export default BoardTile;
