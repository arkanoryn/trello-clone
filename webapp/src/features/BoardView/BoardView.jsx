import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { map, sortBy } from 'lodash';
import { Card, Icon, Avatar } from 'antd';

import { displayErrorState, displayLoadingState } from '../../apollo';
import { columnQueries } from '../../apollo/queries';
import { Column } from '../../components';

const { Meta } = Card;

const BoardView = ({ data: { allColumns } }) => {
  const sortedColumns = sortBy(allColumns, (col) => { return col.position; });

  return (
    <div className="column-list-wrapper">
      <ul className="column-list">
        {
          map(
            sortedColumns,
            (column) => {
              return (
                <Column {...column} key={`column_${column.id}`}>
                  {
                    map(
                      sortBy(column.tickets, (col) => { return (col.columnPosition); }),
                      (ticket) => {
                        return (
                          <Card
                            key={`ticket_${ticket.name}`}
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
                      },
                    )
                  }
                </Column>
              );
            },
          )
        }
      </ul>
    </div>
  );
};

const queryOptions = {
  options: ({ boardId }) => {
    return {
      variables: {
        board_id: boardId,
      },
    };
  },
};

const enhance = compose(
  graphql(columnQueries.allColumns, queryOptions),
  displayLoadingState,
  displayErrorState,
);

export default enhance(BoardView);
