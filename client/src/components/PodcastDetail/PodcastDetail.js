import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis';

import './PodcastDetail.scss';

import EpisodeList from '../EpisodeList/EpisodeList';
import Tag from '../Tag/Tag';

const PodcastDetail = props => {
  const [state, setState] = useState();

  useEffect(() => {
    console.log('Hi, this is an effect!', props.match.params.id);

    axios
      .get(`/api/podcasts/${props.match.params.id}`)
      .then(res => setState(res.data.data));
  }, []);

  // Hard coded genres for now
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

  const showBookmarkIcon = () => {
    if (state.userSaved) {
      return <i className="material-icons primary-color">bookmark</i>;
    } else {
      return <i className="material-icons grey-light">bookmark_border</i>;
    }
  };

  const renderContent = () => {
    if (!state) {
      return null;
    } else {
      return (
        <>
          <div className="PodcastDetail__header mt2">
            <div className="PodcastDetail__thumbnail">
              <img src={state.thumbnail} alt="podcast thumbnail" />
            </div>
            <div className="PodcastDetail__content">
              <div className="PodcastDetail__firstLine">
                <LinesEllipsis
                  text={state.title}
                  className="PodcastDetail__title"
                />
                {showBookmarkIcon()}
              </div>
              <div className="PodcastDetail__description">
                {state.description}
              </div>
              <div className="PodcastDetail__tags mt2">
                {genres.map(genre => {
                  return <Tag text={genre.name} key={genre.id} />;
                })}
              </div>
            </div>
          </div>
          <EpisodeList episodes={state.episodes} />
        </>
      );
    }
  };

  return (
    <div className="PodcastDetail">
      <div className="row justify-content-md-center">
        <div className="Podcasts__container col-12 col-md-10 col-lg-8">
          <div className="PodcastDetail__backLink mt2">
            <a href="#" onClick={() => props.history.goBack()}>
              ← Back
            </a>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
