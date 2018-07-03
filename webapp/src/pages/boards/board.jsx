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

  return (
    <AppLayout breadcrumbItems={breadcrumbItems} actions={actions(openModal)}>
      <NewColumnModal />


      <BoardView boardId={getBoardIdFromLocation(location)} />
      <div className="column-list-wrapper">
        <ul className="column-list">
          {/* {
            map(
              sortedColumns,
              (column) => {
                return (
                  <li className="column-view" key={`column_${column.name}`}>
                    <div className="column-header">
                      <h2>{column.name}</h2>
                    </div>

                    {
                      map(
                        column.tickets,
                        (ticket) => {
                          return (
                            <Card
                              key={`ticket_${ticket.name}`}
                              className="ticket-card"
                              actions={[
                                <span >25 <Icon type="message" /></span>,
                                <span >52 <Icon type="github" /></span>,
                                <span >5 <Icon type="paper-clip" /></span>,
                                <Dropdown overlay={menu}>
                                  <span>
                                    <Icon type="setting" />
                                  </span>
                                </Dropdown>,
                              ]}
                            >
                              <Meta
                                avatar={<Avatar
                                  size="large"
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />}
                                description={
                                  <div>This is the description loong This is the description loong This
                                    is the description loong This is the description loong This is the description loong
                                  </div>
                                }
                              />
                            </Card>
                          );
                        },
                      )
                    }
                  </li>
                );
              },
            )
          } */}
        </ul>
      </div>
    </AppLayout >
  );
};

const mapDispatchToProps = {
  openModal: newColumnActions.open,
};

export default withRouter(connect(null, mapDispatchToProps)(BoardPage));
