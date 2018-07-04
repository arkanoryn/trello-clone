import React from 'react';
import {
  Col,
  Dropdown,
  Icon,
  Menu,
  Row,
  Tooltip,
} from 'antd';

const ADD_TICKET = 'Column/addTicket';
const EDIT_COLUMN = 'Column/editColumn';
const DELETE_COLUMN = 'Column/deleteColumn';

const { Item: MenuItem } = Menu;

const handleMenuClick = ({ key }, column) => {
  console.log('clicked menu of column:', column.id);

  switch (key) {
    case ADD_TICKET:
      // open new ticket modal
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

const menu = (column) => {
  return (
    <Menu onClick={(args) => { return handleMenuClick(args, column); }}>
      <MenuItem disabled key={ADD_TICKET}>
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

const Column = ({ column, children }) => {
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
            <Dropdown overlay={menu(column)}>
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

export default Column;
