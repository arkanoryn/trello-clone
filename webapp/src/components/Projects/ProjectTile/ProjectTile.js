import React from 'react';
import { Card, Icon, Avatar, Tooltip } from 'antd';

const { Meta } = Card;

const DEFAULT_COVER = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
const DEFAULT_STYLE = {
  height:       200,
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

const ProjectTile = ({
  id, name, description, image, style = DEFAULT_STYLE, goToProject = () => { },
}) => {
  return (
    <Card
      hoverable
      className="project-card"
      bordered={false}
      title={<div><Avatar src={image || DEFAULT_COVER} /> {name}</div>}
      extra={<Icon type="ellipsis" />}
      style={style}
    >
      <Tooltip title={description}>
        <Meta
          description={description}
          onClick={() => { return goToProject(id); }}
        />
      </Tooltip>
    </Card >
  );
};

export default ProjectTile;
