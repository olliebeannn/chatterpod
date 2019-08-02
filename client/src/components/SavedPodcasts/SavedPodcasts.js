import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PodcastList from '../PodcastList/PodcastList';

const SavedPodcasts = props => {
  const [podcasts, setPodcasts] = useState();

  // on component mount
  useEffect(() => {
    console.log('Hi, this is an effect!');

    axios
      .get('/api/podcasts/saved')
      .then(res => setPodcasts(res.data.data.podcasts));
  }, []);

  return (
    <div>
      <h1>Saved Podcasts test</h1>
      <PodcastList podcasts={podcasts} />
    </div>
  );
};

export default SavedPodcasts;
