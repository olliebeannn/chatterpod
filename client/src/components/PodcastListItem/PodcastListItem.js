import React from 'react';

import './PodcastListItem.scss';

import Tag from '../Tag/Tag';

const PodcastListItem = props => {
  return (
    <div className="PodcastListItem">
      <div className="PodcastListItem__thumbnail">
        <img src={props.thumbnail} />
      </div>
      <div className="PodcastListItem__content">
        <div className="PodcastListItem__firstLine">
          <h1 className="PodcastListItem__title">{props.title}</h1>
          <i className="material-icons grey-light">bookmark_border</i>
        </div>
        <p className="PodcastListItem__description">{props.description}</p>
        <div className="PodcastListItem__tags mt2">
          {props.genres.map(genre => {
            return <Tag text={genre.name} id={genre.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PodcastListItem;
