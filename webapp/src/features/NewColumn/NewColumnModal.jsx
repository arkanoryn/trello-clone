import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, notification } from 'antd';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';

import { NewColumnForm, GraphqlErrorNotification } from '../../components';
import { newColumnActions } from './reducer';
import { columnQueries } from '../../apollo/queries';

const handleSubmit = ({
  close, mutate, startLoading, endLoading,
}) => {
  return (variables) => {
    startLoading();

    return mutate({
      variables,
      refetchQueries: [{ query: columnQueries.allColumns, variables: { boardId: variables.boardId } }],
    })
      .then(({ data: { createColumn } }) => {
        endLoading();
        close();
        notification.success({ message: `Column [${createColumn.name}] successfully created.` });
        return true;
      })
      .catch((error) => {
        endLoading();
        GraphqlErrorNotification(error);
      });
  };
};

const NewColumnModal = ({
  location, isOpen, close, loading, handleOnSubmit, boardId,
}) => {
  return (
    <Modal
      title="New column"
      visible={isOpen}
      confirmLoading={loading}
      onCancel={() => { close(); }}
      footer={[
        <Button key="back" onClick={close}>Return</Button>,
      ]}
    >
      <NewColumnForm
        loading={loading}
        onSubmit={(values) => { return handleOnSubmit({ ...values, boardId }, location); }}
      />
    </Modal >
  );
};

const mapStateToProps = ({ columns: { newColumn } }) => {
  return ({
    isOpen:  newColumn.isOpen,
    loading: newColumn.isLoading,
  });
};

const mapDispatchToProps = {
  close:        newColumnActions.close,
  startLoading: newColumnActions.startLoading,
  endLoading:   newColumnActions.endLoading,
};

const enhance = compose(
  graphql(columnQueries.createColumn),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleOnSubmit: handleSubmit,
  }),
);

export default enhance(NewColumnModal);
