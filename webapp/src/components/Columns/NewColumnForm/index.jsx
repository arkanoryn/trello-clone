import React from 'react';
import { Form } from 'antd';

import { decorators, FormItemInput, FormItemInputNumber, FormItemSubmitButton } from '../../../components';

const handleSubmit = (e, form, onSubmit) => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (!err) {
      onSubmit(values);
    }
  });
};

const positivNumberProps = {
  min: 0,
};

const NewColumnFormWrapper = ({ form, onSubmit, loading }) => {
  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical" onSubmit={(e) => { handleSubmit(e, form, onSubmit); }}>
      <FormItemInput
        id="name"
        customFormItemProps={{ label: "Column's name" }}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemInputNumber
        id="wipLimit"
        customFormItemProps={{ label: 'Work in progress limit' }}
        customInputProps={positivNumberProps}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemInputNumber
        id="position"
        customFormItemProps={{ label: 'Position' }}
        customInputProps={positivNumberProps}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemSubmitButton buttonProps={{ loading }} />
    </Form>
  );
};

const NewColumnForm = Form.create()(NewColumnFormWrapper);

export default NewColumnForm;
