import React from 'react';
import {
  Form,
  Button,
} from 'antd';

const FormItem = Form.Item;

const DEFAULT_BUTTON_PROPS = {
  type:     'primary',
  htmlType: 'submit',
};

const DEFAULT_FORM_ITEM_PROPS = {
  style: {
    textAlign: 'right',
  },
};

const FormItemSubmitButton =
  ({
    children, buttonText = 'Submit', buttonProps = DEFAULT_BUTTON_PROPS, formItemProps = DEFAULT_FORM_ITEM_PROPS,
  }) => {
    const buttonState = {
      ...DEFAULT_BUTTON_PROPS,
      ...buttonProps,
    };

    return (
      <FormItem {...formItemProps}>
        <Button {...buttonState}>
          {children || buttonText}
        </Button>
      </FormItem>
    );
  };

export default FormItemSubmitButton;
