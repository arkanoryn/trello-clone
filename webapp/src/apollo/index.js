import React from 'react';
import { branch, renderComponent } from 'recompose';
import { Row, Col, Spin } from 'antd';

const Spinner = () => {
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center', marginTop: 100 }}>
        <Spin size="large" />
      </Col>
    </Row>
  );
};

const displayLoadingState = branch(
  ({ data: { loading } }) => { return loading; },
  renderComponent(Spinner),
);

const tmp = '';

export { displayLoadingState, tmp };
