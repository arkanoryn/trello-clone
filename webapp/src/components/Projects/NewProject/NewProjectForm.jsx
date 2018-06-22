import React from 'react';
import { Form } from 'antd';

import { decorators, FormItemInput, FormItemTextArea, FormItemSubmitButton } from '../../../components';

const handleSubmit = (e, form, onSubmit) => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (!err) {
      onSubmit(values);
    }
  });
};

const NewProjectFormWrapper = ({ form, onSubmit, loading }) => {
  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical" onSubmit={(e) => { handleSubmit(e, form, onSubmit); }}>
      <FormItemInput
        id="name"
        customFormItemProps={{ label: 'name' }}
        decorator={{}}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemTextArea
        id="description"
        customFormItemProps={{ label: 'description' }}
        customTextAreaProps={{ autosize: { minRows: 5, maxRows: 10 } }}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemSubmitButton buttonProps={{ loading }} />
    </Form>
  );
};

const NewProjectForm = Form.create()(NewProjectFormWrapper);

export default NewProjectForm;
