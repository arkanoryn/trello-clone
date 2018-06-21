import React from 'react';
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

const DEFAULT_COVER = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

const goToProject = (id) => {
  console.log(`go to project: ${id}`);
};

// const goToEditProject = (id) => {
//   console.log(`go to edit project: ${id}`);
// };

// const goToProjectSettings = (id) => {
//   console.log(`go to project settings: ${id}`);
// };

const ProjectTile = ({
  id, name, description, image,
}) => {
  return (
    <Card
      hoverable
      className="project-card"
      bordered={false}
      title={<div><Avatar src={image || DEFAULT_COVER} /> {name}</div>}
      extra={<Icon type="ellipsis" />}
      style={{ height: 200, textOverflow: 'ellipsis', whiteSpace: 'pre-line', overflow: 'hidden' }}
    >
      <Meta
        description={description}
        onClick={() => { return goToProject(id); }}
      />
    </Card >
  );
};

export default ProjectTile;
