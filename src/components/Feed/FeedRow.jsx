import React from 'react';
import FeedRowItem from './FeedRowItem';
import styles from './FeedRow.scss';

const FeedRow = ({
  values,
  children, // if you needed a component like LineupAdd
}) => (
  <div className="feed-row">
    {values && values.map(value => (
      <FeedRowItem key={`${value}`} value={value} />
    ))}
    {children}
  </div>
);

export default FeedRow;
