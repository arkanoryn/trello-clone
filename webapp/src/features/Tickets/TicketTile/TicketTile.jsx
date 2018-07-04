import React from 'react';
import { Avatar, Card, Icon } from 'antd';

const { Meta } = Card;

const TicketTile = ({ ticket }) => {
  return (
    <Card
      className="ticket-card"
      actions={[
        <span >25 <Icon type="message" /></span>,
        <span >52 <Icon type="github" /></span>,
        <span >5 <Icon type="paper-clip" /></span>,
        // <Dropdown overlay={menu}>
        //   <span>
        //     <Icon type="setting" />
        //   </span>
        // </Dropdown>,
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
