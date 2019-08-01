import React from 'react';
import './Tag.scss';

const Tag = props => {
  return <span className="Tag mr1">#{props.text}</span>;
};

export default Tag;
