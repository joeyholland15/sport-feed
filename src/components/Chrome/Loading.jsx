import React from 'react';
import FontAwesome from 'react-fontawesome';
import './Loading.scss';

const Loading = ({
  size,
}) => (
  <div className="loading">
    <FontAwesome
      name="spinner"
      spin
      size={size || '2x'}
    />
  </div>
);

export default Loading;
