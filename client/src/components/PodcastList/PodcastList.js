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
        ({ podcastId, title, description, thumbnail }) => {
          return (
            <PodcastListItem
              key={podcastId}
              title={title}
              description={description}
              thumbnail={thumbnail}
              genres={genres}
            />
          );
        }
      );
    } else {
      return null;
    }
  };

  return (
    <div className="PodcastList">
      <PodcastListItem
        title="TEST"
        description="Author Dana Schwartz explores the stories of some of his…when you’re wearing a crown, mistakes often mean blood."
        thumbnail="https://cdn-images-1.listennotes.com/podcasts/noble-blood-iheartradio-oi2LjrdD_vE-bAQak1jR0OK.300x300.jpg"
        key="88b15eefe35d42c58bca9c5e17080661"
        genres={genres}
      />
      {renderPodcasts()}
    </div>
  );
};

export default PodcastList;
