import React from 'react';
import { Button, Form, Icon, Input } from 'antd';

const FormItem = Form.Item;

const NewProjectFormWrapper = ({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical" onSubmit={this.handleSubmit}>
      <FormItem
        validateStatus={true ? 'error' : ''}
        help="help"
      >
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
        )}
      </FormItem>
      <FormItem >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          disabled
        >
          Log in
        </Button>
      </FormItem>
    </Form>
  );
};

const NewProjectForm = Form.create()(NewProjectFormWrapper);

export default NewProjectForm;
