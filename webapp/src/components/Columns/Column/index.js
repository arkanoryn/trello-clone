import React from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Dropdown,
  Icon,
  Menu,
  Row,
  Tooltip,
} from 'antd';

import { ticketFormModalActions } from '../../../features';

const ADD_TICKET = 'Column/addTicket';
const EDIT_COLUMN = 'Column/editColumn';
const DELETE_COLUMN = 'Column/deleteColumn';

const { Item: MenuItem } = Menu;

const handleMenuClick = ({ key }, column, actions) => {
  console.log('clicked menu of column:', column.id);

  switch (key) {
    case ADD_TICKET:
      actions.openModal();
      break;

    case EDIT_COLUMN:
      // open new ticket modal
      break;

    case DELETE_COLUMN:
      // deleteColumn
      break;

    default:
      return false;
  }
  return true;
};

const menu = (column, actions) => {
  return (
    <Menu onClick={(args) => { return handleMenuClick(args, column, actions); }}>
      <MenuItem key={ADD_TICKET}>
        <Icon type="plus" /> new ticket
      </MenuItem>
      <MenuItem disabled key={EDIT_COLUMN}>
        <Icon type="edit" /> edit
      </MenuItem>
      <MenuItem disabled key={DELETE_COLUMN}>
        <Icon type="delete" /> remove
      </MenuItem>
    </Menu >
  );
};

const Column = ({ column, children, openModal }) => {
  const actions = { openModal };

  return (
    <li className="column-view">
      <div className="column-header">
        <Row type="flex" align="middle">
          <Col span={22}>
            <h2>{column.name}
              <span style={{ fontSize: 14, marginLeft: 12 }}>
                <Tooltip title="Work in progress limit">
                  [{column.wipLimit}]
                </Tooltip>
              </span>
            </h2>
          </Col>

          <Col span={2}>
            <Dropdown overlay={menu(column, actions)}>
              <span>
                <Icon type="ellipsis" />
              </span>
            </Dropdown>
          </Col>
        </Row>
      </div>

      {children}
    </li>
  );
};

const mapDispatchToProps = {
  openModal: ticketFormModalActions.open,
};

export default connect(null, mapDispatchToProps)(Column);
