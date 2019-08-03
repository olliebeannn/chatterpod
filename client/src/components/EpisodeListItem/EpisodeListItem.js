import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import moment from 'moment';

import './EpisodeListItem.scss';

const EpisodeListItem = props => {
  const formatDate = unixTs => {
    return moment.unix(unixTs / 1000).format('ddd MMM D YYYY');
  };

  return (
    <div className="EpisodeListItem" key={props.id}>
      <div className="EpisodeListItem__content">
        <div className="EpisodeListItem__firstLine">
          <LinesEllipsis
            className="EpisodeListItem__title"
            text={props.title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
          <div className="EpisodeListItem__rating">Rating</div>
          <i className="material-icons grey-light">bookmark_border</i>
        </div>
        <div className="EpisodeListItem__pubDate mt1">
          <i className="material-icons grey-light">date_range</i>
          <p className="grey-light ml05">{formatDate(props.pubDate)}</p>
        </div>
        <div className="EpisodeListItem__description mt1">
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default EpisodeListItem;
