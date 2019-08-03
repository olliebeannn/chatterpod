import React from 'react';

import EpisodeListItem from '../EpisodeListItem/EpisodeListItem';

const EpisodeList = props => {
  return (
    <div className="EpisodeList">
      {props.episodes.map(episode => {
        return (
          <EpisodeListItem
            id={episode.id}
            title={episode.title}
            description={episode.description}
            pubDate={episode.pub_date_ms}
          />
        );
      })}
    </div>
  );
};

export default EpisodeList;
