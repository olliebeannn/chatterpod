import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as actions from '../actions';

import Header from './Header/Header';
import Landing from './Landing/Landing';
import Podcasts from './Podcasts/Podcasts';
import Episodes from './Episodes/Episodes';
import PodcastDetail from './PodcastDetail/PodcastDetail';

import '../styles/reset.css';
import '../styles/base.scss';
import './App.scss';

function App(props) {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <div className="App container-fluid">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/podcasts/detail/:id" component={PodcastDetail} />
          <Route path="/podcasts" component={Podcasts} />
          <Route path="/episodes" component={Episodes} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(
  null,
  actions
)(App);
