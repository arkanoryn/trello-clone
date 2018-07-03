import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { map, sortBy } from 'lodash';

import { displayLoadingState } from '../../apollo';
import { columnQueries } from '../../apollo/queries';
import { Column } from '../../components';

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
                <Column {...column} key={`column_${column.name}`}>
                  Here will be my tickets
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
);

export default enhance(BoardView);
