import React from 'react';
import {
  Form,
  Input,
} from 'antd';
import { styles } from '../';

const FormItem = Form.Item;
const { TextArea } = Input;

const fluidFormItemLayout = styles;

const defaultFormItemProps = {
  ...fluidFormItemLayout,
  hasFeedback: true,
  label:       false,
};

const FormItemTextArea = ({
  id, getFieldDecorator, decorator = {}, customFormItemProps = {}, customTextAreaProps = {},
}) => {
  const formItemProps = { ...defaultFormItemProps, ...customFormItemProps };

  return (
    <FormItem {...formItemProps}>
      {
        getFieldDecorator(id, decorator)(<TextArea
          {...customTextAreaProps}
          placeholder={customTextAreaProps.placeholder || formItemProps.label}
        />)
      }
    </FormItem>
  );
};

export default FormItemTextArea;
