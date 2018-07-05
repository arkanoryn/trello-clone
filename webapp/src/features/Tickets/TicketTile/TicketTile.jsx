import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Card, Dropdown, Icon, Menu } from 'antd';
import { map } from 'lodash';

import { ticketFormModalActions } from '../TicketFormModal/reducer';

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
    icon:   'edit',
    title:  'edit',
    action: EDIT,
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

const handleMenuClick = ({ key }, ticket, actions) => {
  switch (key) {
    case MOVE:
      // move ticket
      break;

    case EDIT:
      actions.openModal(ticket.column.id, ticket);
      break;

    case ASSIGN:
      // assign member
      break;

    case DELETE:
      // delete ticket
      break;

    default:
      return false;
  }
  return true;
};


const menu = (items, ticket, actions) => {
  return (
    <Menu onClick={(args) => { return handleMenuClick(args, ticket, actions); }}>
      {
        map(
          items,
          ({
            action, icon, title, options = {},
          }) => {
            return (
              <Item {...options} key={action}>
                <Icon type={icon} /> {title}
              </Item>
            );
          },
        )
      }
    </Menu >
  );
};


const TicketTile = ({ ticket, menuItems = DEFAULT_MENU_ITEMS, openModal }) => {
  const actions = { openModal };

  return (
    <Card
      className="ticket-card"
      actions={[
        <span >25 <Icon type="message" /></span>,
        <span >52 <Icon type="github" /></span>,
        <span >5 <Icon type="paper-clip" /></span>,
        <Dropdown overlay={menu(menuItems, ticket, actions)}>
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

const mapDispatchToProps = {
  openModal: ticketFormModalActions.open,
};

export default connect(null, mapDispatchToProps)(TicketTile);
