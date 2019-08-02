import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';

import Tag from '../Tag/Tag';

const PodcastDetail = props => {
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

  return (
    <div className="PodcastDetail">
      <div className="row justify-content-md-center">
        <div className="Podcasts__container col-12 col-md-10 col-lg-8">
          <div className="PodcastDetail__backLink">Back</div>
          <div className="PodcastDetail__header">
            <div className="PodcastDetail__thumbnail">
              <img src={props.thumbnail} alt="podcast thumbnail" />
            </div>
            <div className="PodcastDetail__content">
              <div className="PodcastDetail__firstLine">
                <LinesEllipsis />
                <i className="material-icons grey-light">bookmark_border</i>
                <div className="PodcastDetail__rating">Rating</div>
              </div>
              <div className="PodcastDetail__description">Description</div>
              <div className="PodcastDetail__tags mt2">
                {genres.map(genre => {
                  return <Tag text={genre.name} key={genre.id} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
