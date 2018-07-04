import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { map, sortBy } from 'lodash';

import { displayErrorState, displayLoadingState } from '../../apollo';
import { columnQueries } from '../../apollo/queries';
import { Column } from '../../components';
import { TicketsList } from '../../features';

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
                <Column column={column} key={`column_${column.id}`}>
                  <TicketsList columnId={column.id} />
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
        boardId,
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
