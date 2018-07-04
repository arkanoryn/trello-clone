import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

import { ticketFormModalActions } from './reducer';

const TicketFormModal = ({ isOpen, isLoading, close }) => {
  return (
    <Modal
      title="New ticket"
      visible={isOpen}
      confirmLoading={isLoading}
      onCancel={() => { close(); }}
      footer={[
        <Button key="back" onClick={close}>Cancel</Button>,
      ]}
    >
      text
    </Modal>
  );
};

const mapStateToProps = ({ tickets: { ticketFormModal } }) => {
  return ({
    isOpen:    ticketFormModal.isOpen,
    isLoading: ticketFormModal.isLoading,
  });
};

const mapDispatchToProps = {
  close:        ticketFormModalActions.close,
  startLoading: ticketFormModalActions.startLoading,
  endLoading:   ticketFormModalActions.endLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketFormModal);
