import React from 'react';
import { Route } from 'react-router-dom';

import './Podcasts.scss';

import SavedPodcasts from '../SavedPodcasts/SavedPodcasts';
import TopPodcasts from '../TopPodcasts/TopPodcasts';

const Podcasts = props => {
  return (
    <div className="Podcasts">
      <div className="row justify-content-md-center">
        <div className="Podcasts__container col-12 col-md-10 col-lg-8">
          <Route path={`${props.match.path}/saved`} component={SavedPodcasts} />
          <Route path={`${props.match.path}/top`} component={TopPodcasts} />
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
