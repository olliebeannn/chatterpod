import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header/Header';
import Landing from './Landing/Landing';
import Podcasts from './Podcasts/Podcasts';
import Episodes from './Episodes/Episodes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <a href="/auth/google">
          <button>Login with Google</button>
        </a>
        <Route path="/" exact component={Landing} />
        <Route path="/podcasts" component={Podcasts} />
        <Route path="/episodes" component={Episodes} />
      </BrowserRouter>
    </div>
  );
}

export default App;
