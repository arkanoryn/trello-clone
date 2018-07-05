import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { Button, notification } from 'antd';
import { last, isEmpty } from 'lodash';

import { ticketQueries } from '../../apollo/queries';
import { AppLayout, GraphqlErrorNotification } from '../../components';
import { newColumnActions, NewColumnModal, BoardView, TicketFormModal, ticketFormModalActions } from '../../features';

const project = { name: 'Alpha' };
const board = { name: 'webapp' };
const breadcrumbItems = { 1: project, 2: { name: 'Boards' }, 3: board };

const actions = (openModal) => {
  return (
    <Button
      ghost
      icon="plus"
      onClick={() => { openModal(); }}
      size="small"
      type="primary"
    >
      New column
    </Button>
  );
};

const handleCreateTicket = ({
  closeTicketFormModal, createTicketMutation, startLoading, endLoading,
}) => {
  return (variables) => {
    startLoading();

    return createTicketMutation({
      variables,
      refetchQueries: [{ query: ticketQueries.allColumnTickets, variables: { columnId: variables.columnId } }],
    })
      .then(({ data: { createTicket } }) => {
        endLoading();
        closeTicketFormModal();
        notification.success({ message: `Column [${createTicket.name}] successfully created.` });
        return true;
      })
      .catch((error) => {
        endLoading();
        GraphqlErrorNotification(error);
      });
  };
};

const handleUpdateTicket = ({
  closeTicketFormModal, updateTicketMutation, startLoading, endLoading,
}) => {
  return (variables) => {
    startLoading();

    return updateTicketMutation({
      variables:      ticketQueries.buildUpdateTicketVariables(variables),
      refetchQueries: [{ query: ticketQueries.allColumnTickets, variables: { columnId: variables.columnId } }],
    })
      .then(({ data: { updateTicket } }) => {
        endLoading();
        closeTicketFormModal();
        notification.success({ message: `Column [${updateTicket.name}] successfully updated.` });
        return true;
      })
      .catch((error) => {
        endLoading();
        GraphqlErrorNotification(error);
      });
  };
};

// pathname is in the format: /project/:id/board/:board_id
// last element of the pathname is the board_id we are looking for
const getBoardIdFromLocation = ({ pathname }) => {
  const id = last(pathname.split('/'));

  return parseInt(id, 0);
};

const BoardPage = ({
  location, openColumnModal, createTicket, ticket, updateTicket,
}) => {
  // const sortedColumns = sortBy(columns, (col) => { return col.position; });
  const boardId = getBoardIdFromLocation(location);
  const handleOnSubmit = isEmpty(ticket) ? createTicket : updateTicket;

  return (
    <AppLayout breadcrumbItems={breadcrumbItems} actions={actions(openColumnModal)}>
      <BoardView boardId={boardId} />

      <NewColumnModal boardId={boardId} />
      <TicketFormModal boardId={boardId} onSubmit={handleOnSubmit} />
    </AppLayout >
  );
};

const mapStateToProps = ({ tickets: { ticketFormModal } }) => {
  return ({
    ticket: ticketFormModal.ticket,
  });
};

const mapDispatchToProps = {
  openColumnModal:      newColumnActions.open,
  startLoading:         ticketFormModalActions.startLoading,
  endLoading:           ticketFormModalActions.endLoading,
  closeTicketFormModal: ticketFormModalActions.close,
};

const enhance = compose(
  graphql(ticketQueries.createTicket, { name: 'createTicketMutation' }),
  graphql(ticketQueries.updateTicket, { name: 'updateTicketMutation' }),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withHandlers({
    createTicket: handleCreateTicket,
    updateTicket: handleUpdateTicket,
  }),
);

export default enhance(BoardPage);
