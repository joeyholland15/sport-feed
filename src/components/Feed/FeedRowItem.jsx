import React from 'react';
import styles from './FeedRow.scss';

const FeedRowItem = ({
  value,
  image, // optional
  className,
}) => {
  return (
    <div className={`feed-row-cell ${className || ''}`}>
      {value}
    </div>
  );
}

export default FeedRowItem;
