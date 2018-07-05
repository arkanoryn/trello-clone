import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

import { TicketForm } from '../../../components';
import { ticketFormModalActions } from './reducer';

const TicketFormModal = ({
  isOpen, isLoading, close, ticket = {}, ticketsCount = 0, onSubmit, boardId, columnId,
}) => {
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
      <TicketForm
        ticket={ticket}
        ticketsCount={ticketsCount}
        onSubmit={(values) => {
          return (onSubmit({
            ...values, boardId, columnId, id: ticket.id,
          }));
        }}
      />
    </Modal>
  );
};

const mapStateToProps = ({ tickets: { ticketFormModal } }) => {
  return ({
    isOpen:    ticketFormModal.isOpen,
    isLoading: ticketFormModal.isLoading,
    ticket:    ticketFormModal.ticket,
    columnId:  ticketFormModal.columnId,
  });
};

const mapDispatchToProps = {
  close:        ticketFormModalActions.close,
  startLoading: ticketFormModalActions.startLoading,
  endLoading:   ticketFormModalActions.endLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketFormModal);
