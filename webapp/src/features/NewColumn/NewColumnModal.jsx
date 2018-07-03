import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';

import { NewColumnForm } from '../../components';
import { newColumnActions } from './reducer';
import { columnQueries } from '../../apollo/queries';

const handleSubmit = () => {

};

const NewColumnModal = ({ isOpen, close, loading }) => {
  return (
    <Modal
      title="New column"
      visible={isOpen}
      onOk={() => { handleSubmit(); }}
      confirmLoading={loading}
      onCancel={() => { close(); }}
    >
      <NewColumnForm />
    </Modal>
  );
};

const mapStateToProps = ({ columns: { newColumn } }) => {
  return ({
    isOpen:  newColumn.isOpen,
    loading: false,
  });
};

const mapDispatchToProps = {
  close: newColumnActions.close,
};

const enhance = compose(
  // graphql(columnQueries.createProject),
  connect(mapStateToProps, mapDispatchToProps));

export default enhance(NewColumnModal);
