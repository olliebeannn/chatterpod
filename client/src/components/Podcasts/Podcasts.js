import React from 'react';

import './Podcasts.scss';

import PodcastList from '../PodcastList/PodcastList';

const Podcasts = props => {
  return (
    <div className="Podcasts">
      <div className="row justify-content-md-center">
        <div className="Podcasts__container col-12 col-md-8">
          <p>Podcasts placeholder</p>
          <PodcastList />
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
