import React from 'react';
import './PodcastList.scss';

import PodcastListItem from '../PodcastListItem/PodcastListItem';

const PodcastList = props => {
  const genres = [
    {
      id: 125,
      name: 'History'
    },
    {
      id: 122,
      name: 'Society & Culture'
    }
  ];

  const renderPodcasts = () => {
    if (props.podcasts) {
      return props.podcasts.map(
        ({ podcastId, title, description, thumbnail, userSaved }) => {
          return (
            <PodcastListItem
              key={podcastId}
              podcastId={podcastId}
              title={title}
              description={description}
              thumbnail={thumbnail}
              genres={genres}
              userSaved={userSaved}
            />
          );
        }
      );
    } else {
      return null;
    }
  };

  return <div className="PodcastList">{renderPodcasts()}</div>;
};

export default PodcastList;
