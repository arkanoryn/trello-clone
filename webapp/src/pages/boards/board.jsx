import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { last } from 'lodash';

import { AppLayout } from '../../components';
import { newColumnActions, NewColumnModal, BoardView } from '../../features';

// const { Meta } = Card;

const project = { name: 'Alpha' };
const board = { name: 'webapp' };
const breadcrumbItems = { 1: project, 2: { name: 'Boards' }, 3: board };

// const tickets = [
//   { name: 'ticket 1', position: 1 },
//   { name: 'ticket 2', position: 2 },
//   { name: 'ticket 3', position: 3 },
//   { name: 'ticket 4', position: 4 },
// ];

// const menu = (
//   <Menu>
//     <Menu.Item>
//       <Icon type="export" /> move
//     </Menu.Item>
//     <Menu.Item>
//       <Icon type="edit" /> edit
//     </Menu.Item>
//     <Menu.Item>
//       <Icon type="user-add" /> change assignee
//     </Menu.Item>
//     <Menu.Item>
//       <Icon type="delete" /> remove
//     </Menu.Item>
//   </Menu >
// );

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

// pathname is in the format: /project/:id/board/:board_id
// last element of the pathname is the board_id we are looking for
const getBoardIdFromLocation = ({ pathname }) => {
  const id = last(pathname.split('/'));

  return parseInt(id, 0);
};

const BoardPage = ({ location, openModal }) => {
  // const sortedColumns = sortBy(columns, (col) => { return col.position; });
  const boardId = getBoardIdFromLocation(location);

  return (
    <AppLayout breadcrumbItems={breadcrumbItems} actions={actions(openModal)}>
      <NewColumnModal boardId={boardId} />

      <BoardView boardId={boardId} />
    </AppLayout >
  );
};

const mapDispatchToProps = {
  openModal: newColumnActions.open,
};

export default withRouter(connect(null, mapDispatchToProps)(BoardPage));
