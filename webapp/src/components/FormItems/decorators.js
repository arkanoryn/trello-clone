const emailDecorator = (required, params = { rules: [] }) => {
  return {
    ...params,
    rules: [{
      type:    'email', message: 'invalid email',
    }, {
      required, message: 'field required',
    },
            ...params.rules,
    ],
  };
};

const requiredDecorator = (params = { rules: [] }) => {
  return {
    ...params,
    rules: [{
      required: true, message:  'field required',
    },
            ...params.rules,
    ],
  };
};

const passwordDecorator = (params = { rules: [] }) => {
  return {
    ...params,
    rules: [
      {
        required: true, message:  'field required',
      },
      {
        min:     8, message: 'min 8 char',
      },
      ...params.rules,
    ],
  };
};

const numberDecorator = (required, params = { rules: [] }) => {
  return {
    ...params,
    rules: [
      {
        type:    'number', message: 'must be a valid number',
      },
      {
        required, message: 'field required',
      },
      ...params.rules,
    ],
  };
};

const decorators = {
  emailDecorator,
  numberDecorator,
  requiredDecorator,
  passwordDecorator,
};

export default decorators;
