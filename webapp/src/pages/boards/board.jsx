import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Avatar, Dropdown, Menu } from 'antd';
import { sortBy, map } from 'lodash';

import { AppLayout } from '../../components';

const { Meta } = Card;

const project = { name: 'Alpha' };
const board = { name: 'webapp' };
const breadcrumbItems = { 1: project, 2: { name: 'Boards' }, 3: board };

const tickets = [
  { name: 'ticket 1', position: 1 },
  { name: 'ticket 2', position: 2 },
  { name: 'ticket 3', position: 3 },
  { name: 'ticket 4', position: 4 },
];

const COLUMNS = [
  { name: 'first', position: 1, tickets },
  { name: 'second', position: 2 },
  { name: 'fifth', position: 5 },
  { name: 'fourth', position: 4, tickets },
  { name: 'seventh', position: 7 },
  { name: 'third', position: 3 },
  { name: 'sixth', position: 6 },
];

const menu = (
  <Menu>
    <Menu.Item>
      <Icon type="export" /> move
    </Menu.Item>
    <Menu.Item>
      <Icon type="edit" /> edit
    </Menu.Item>
    <Menu.Item>
      <Icon type="user-add" /> change assignee
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" /> remove
    </Menu.Item>
  </Menu >
);

const BoardPage = ({ columns = COLUMNS }) => {
  const sortedColumns = sortBy(columns, (col) => { return col.position; });

  return (
    <AppLayout breadcrumbItems={breadcrumbItems}>
      <div className="column-list-wrapper">
        <ul className="column-list">
          {
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
                                avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                description={<div>This is the description loong This is the description loong This is the description loong This is the description loong This is the description loong</div>}
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
          }
        </ul>
      </div>
    </AppLayout >
  );
};

export default withRouter(BoardPage);
