import React from 'react';
import { Card } from 'antd';

const DEFAULT_ERROR = 'Something wrong happened :(';

const ProjectTileError = ({ error = DEFAULT_ERROR }) => {
  return (
    <Card
      className="project-card"
      bordered={false}
      title="Error :("
      style={{
        height:       200,
        textOverflow: 'ellipsis',
        whiteSpace:   'pre-line',
        overflow:     'hidden',
      }}
    >
      {error}
    </Card>
  );
};

export default ProjectTileError;
