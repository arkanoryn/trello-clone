import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { map, sortBy } from 'lodash';

import { displayErrorState, displayLoadingState } from '../../../apollo';
import { TicketTile } from '../../../features';
import { ticketQueries } from '../../../apollo/queries';

const TicketsList = ({ data: { allColumnTickets } }) => {
  const sortedTickets = sortBy(allColumnTickets, (t) => { return (t.columnPosition); });

  return (
    <React.Fragment>
      {
        map(
          sortedTickets,
          (ticket) => {
            return (<TicketTile ticket={ticket} key={ticket.id} />);
          },
        )
      }
    </React.Fragment>
  );
};

const queryOptions = {
  options: ({ columnId }) => {
    return {
      variables: {
        columnId,
      },
    };
  },
};

const enhance = compose(
  graphql(ticketQueries.allColumnTickets, queryOptions),
  displayLoadingState,
  displayErrorState,
);

export default enhance(TicketsList);
