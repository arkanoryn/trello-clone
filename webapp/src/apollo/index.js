import React from 'react';
import { branch, renderComponent } from 'recompose';
import { Alert, Card, Row, Col, Spin } from 'antd';

const Spinner = () => {
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Card>
          <Spin size="large" />
        </Card>
      </Col>
    </Row>
  );
};

const ErrorComponent = () => {
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Alert
          message="An error occured :("
          description="Sorry for the inconvenience. Please try again."
          type="error"
          showIcon
          style={{ backgroundColor: 'rgba(237, 41, 92, .10)' }}
        />
      </Col>
    </Row>
  );
};

const displayLoadingState = branch(
  ({ data: { loading } }) => { return loading; },
  renderComponent(Spinner),
);

const displayErrorState = branch(
  ({ data: { error } }) => { return error; },
  renderComponent(ErrorComponent),
);

export {
  displayErrorState,
  displayLoadingState,
};
