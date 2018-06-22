import React from 'react';
import { Button, Form, Icon, Input } from 'antd';

const FormItem = Form.Item;

const handleSubmit = (e, form, onSubmit) => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (!err) {
      onSubmit(values);
    }
  });
};

const NewProjectFormWrapper = ({ form, onSubmit }) => {
  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical" onSubmit={(e) => { handleSubmit(e, form, onSubmit); }}>
      <FormItem
        validateStatus={true ? 'error' : ''}
        help="help"
      >
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
      </FormItem>
      <FormItem >
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Password"
        />)}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
        >
          Log in
        </Button>
      </FormItem>
    </Form>
  );
};

const NewProjectForm = Form.create()(NewProjectFormWrapper);

export default NewProjectForm;
