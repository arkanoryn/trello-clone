import React from 'react';
import {
  Form,
  Input,
} from 'antd';
import { styles } from '../';

const FormItem = Form.Item;
const fluidFormItemLayout = styles;

const defaultFormItemProps = {
  ...fluidFormItemLayout,
  hasFeedback: true,
  label:       false,
};

const defaultInputProps = {
  size: 'large',
};

const
    FormItemInput = ({
      id, decorator, getFieldDecorator, customFormItemProps = {}, customInputProps = {},
    }) => {
      const formItemProps = { ...defaultFormItemProps, ...customFormItemProps };
      const inputProps = { ...defaultInputProps, ...customInputProps };

      return (
        <FormItem {...formItemProps}>
          {
            getFieldDecorator(id, decorator)(<Input
              {...inputProps}
              placeholder={customInputProps.placeholder || formItemProps.label}
              lang={customInputProps.lang || ''}
            />)
          }
        </FormItem>
      );
    };

export default FormItemInput;
