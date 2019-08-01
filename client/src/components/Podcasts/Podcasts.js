import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './Podcasts.scss';

import SavedPodcasts from '../SavedPodcasts/SavedPodcasts';
import TrendingPodcasts from '../TrendingPodcasts/TrendingPodcasts';
import PodcastList from '../PodcastList/PodcastList';

const Podcasts = props => {
  const [podcasts, setPodcasts] = useState();

  // on component mount
  useEffect(() => {
    console.log('Hi, this is an effect!');

    axios
      .get('/api/podcasts/saved')
      .then(res => setPodcasts(res.data.data.podcasts));
  }, []);

  return (
    <div className="Podcasts">
      <div className="row justify-content-md-center">
        <div className="Podcasts__container col-12 col-md-10 col-lg-8">
          <Route path={`${props.match.path}/saved`} component={SavedPodcasts} />
          <Route
            path={`${props.match.path}/trending`}
            component={TrendingPodcasts}
          />
          <PodcastList podcasts={podcasts} />
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
