import React from 'react';
import { Route } from 'react-router-dom';

import './Podcasts.scss';

import Subnav from '../Subnav/Subnav';
import SavedPodcasts from '../SavedPodcasts/SavedPodcasts';
import TopPodcasts from '../TopPodcasts/TopPodcasts';

const Podcasts = props => {
  const navitems = [
    {
      path: `${props.match.path}/saved`,
      name: 'Saved'
    },
    {
      path: `${props.match.path}/top`,
      name: 'Top'
    }
  ];

  return (
    <div className="Podcasts">
      <div className="row justify-content-md-center">
        <div className="Podcasts__container col-12 col-md-10 col-lg-8">
          <div className="mt3">
            <Subnav navitems={navitems} />
          </div>
          <div className="mt3">
            <Route
              path={`${props.match.path}/saved`}
              component={SavedPodcasts}
            />
            <Route path={`${props.match.path}/top`} component={TopPodcasts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
