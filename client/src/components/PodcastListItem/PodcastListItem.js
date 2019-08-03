import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import './PodcastListItem.scss';

import Tag from '../Tag/Tag';

const PodcastListItem = props => {
  return (
    <div className="PodcastListItem mt2">
      <div className="PodcastListItem__thumbnail">
        <img src={props.thumbnail} alt="podcast thumbnail" />
      </div>
      <div className="PodcastListItem__content">
        <div className="PodcastListItem__firstLine">
          <a
            href={`/podcasts/detail/${props.podcastId}`}
            className="PodcastListItem__title"
          >
            <LinesEllipsis
              text={props.title}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </a>
          <i className="material-icons grey-light">bookmark_border</i>
        </div>
        <LinesEllipsis
          className="PodcastListItem__description"
          text={props.description}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
        <div className="PodcastListItem__tags mt2">
          {props.genres.map(genre => {
            return <Tag text={genre.name} key={genre.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PodcastListItem;
