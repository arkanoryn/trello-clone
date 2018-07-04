import { notification } from 'antd';

const GraphqlErrorNotification = (error) => {
  notification.error({
    duration:    0,
    message:     'An error occured :(',
    description: (error && error.message) || null,
  });
};

export default GraphqlErrorNotification;
