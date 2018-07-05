import React from 'react';
import { Form } from 'antd';

import {
  decorators,
  FormItemInput,
  FormItemInputNumber,
  FormItemSubmitButton,
  FormItemTextArea,
} from '../../../components';

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

const TicketFormWrapper = ({ form, onSubmit, loading }) => {
  const { getFieldDecorator } = form;

  return (
    <Form layout="vertical" onSubmit={(e) => { handleSubmit(e, form, onSubmit); }}>
      <FormItemInput
        id="name"
        customFormItemProps={{ label: 'Name' }}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemTextArea
        id="description"
        customFormItemProps={{ label: 'Description' }}
        customTextAreaProps={{ autosize: { minRows: 5, maxRows: 10 } }}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemInput
        id="tags"
        customFormItemProps={{ label: 'Tags' }}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemInputNumber
        id="estimation"
        customFormItemProps={{ label: 'Estimation' }}
        customInputProps={positivNumberProps}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemInputNumber
        id="columnPosition"
        customFormItemProps={{ label: 'Position' }}
        customInputProps={positivNumberProps}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemInputNumber
        id="kind"
        customFormItemProps={{ label: 'Kind' }}
        customInputProps={positivNumberProps}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemInputNumber
        id="state"
        customFormItemProps={{ label: 'State' }}
        customInputProps={positivNumberProps}
        decorator={decorators.requiredDecorator()}
        getFieldDecorator={getFieldDecorator}
      />

      <FormItemSubmitButton buttonProps={{ loading }} />
    </Form>
  );
};

const mapPropsToFields = ({ ticket = {}, ticketsCounts = 0 }) => {
  return {
    name:           Form.createFormField({ value: ticket.name }),
    description:    Form.createFormField({ value: ticket.description }),
    tags:           Form.createFormField({ value: ticket.tags }),
    estimation:     Form.createFormField({ value: ticket.estimation || 1 }),
    columnPosition: Form.createFormField({ value: ticket.columnPosition || (ticketsCounts) }),
    kind:           Form.createFormField({ value: ticket.kind || 1 }),
    state:          Form.createFormField({ value: ticket.state || 1 }),
  };
};


export default Form.create({ mapPropsToFields })(TicketFormWrapper);
