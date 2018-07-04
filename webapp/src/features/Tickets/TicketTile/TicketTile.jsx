import React from 'react';
import { Avatar, Card, Dropdown, Icon, Menu } from 'antd';
import { map } from 'lodash';

const { Meta } = Card;
const { Item } = Menu;

const MOVE = 'move';
const EDIT = 'edit';
const ASSIGN = 'assign';
const DELETE = 'delete';

const DEFAULT_MENU_ITEMS = [
  {
    icon:    'export',
    title:   'move',
    action:  MOVE,
    options: { disabled: true },
  },
  {
    icon:    'edit',
    title:   'edit',
    action:  EDIT,
    options: { disabled: true },
  },
  {
    icon:    'user-add',
    title:   'change assignee',
    action:  ASSIGN,
    options: { disabled: true },
  },
  {
    icon:    'delete',
    title:   'remove',
    action:  DELETE,
    options: { disabled: true },
  },
];

const menu = (items, ticketId) => {
  return (
    <Menu>
      {
        map(
          items,
          ({
            action, icon, title, options = {},
          }) => {
            return (
              <Item {...options} key={`${action}-${ticketId}`}>
                <Icon type={icon} /> {title}
              </Item>
            );
          },
        )
      }
    </Menu >
  );
};


const TicketTile = ({ ticket, menuItems = DEFAULT_MENU_ITEMS }) => {
  return (
    <Card
      className="ticket-card"
      actions={[
        <span >25 <Icon type="message" /></span>,
        <span >52 <Icon type="github" /></span>,
        <span >5 <Icon type="paper-clip" /></span>,
        <Dropdown overlay={menu(menuItems, ticket.id)}>
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
        description={ticket.name}
      />
    </Card>
  );
};

export default TicketTile;
