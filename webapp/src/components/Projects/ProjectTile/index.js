import React from 'react';
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

const DEFAULT_AVATAR = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
const DEFAULT_COVER = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'

const goToProject = (id) => {
  console.log(`go to project: ${id}`)
};

const goToEditProject = (id) => {
  console.log(`go to edit project: ${id}`)
};

const goToProjectSettings = (id) => {
  console.log(`go to project settings: ${id}`)
};

const ProjectTile = ({ id, name, description, image, creator: { avatar } = {} }) => (
  <Card
    style={{ width: '100%' }}
    cover={<img alt='example' src={image || DEFAULT_COVER} style={{ maxHeight: 250 }} onClick={() => goToProject(id)} />}
    actions={[
      <Icon type='eye-o' onClick={() => goToProject(id)} />,
      <Icon type='edit' onClick={() => goToEditProject(id)} />,
      <Icon type='setting' onClick={() => goToProjectSettings(id)} />,
    ]}
  >
    <Meta
      avatar={<Avatar src={avatar || DEFAULT_AVATAR} />}
      title={name}
      description={description}
      onClick={() => goToProject(id)}
    />
  </Card>
);

export default ProjectTile;