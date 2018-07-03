import React from 'react';

const Column = ({
  id, name, children,
}) => {
  return (
    <li className="column-view">
      <div className="column-header">
        <h2>{name} [{id}]</h2>
      </div>

      {children}
    </li>
  );
};

export default Column;
