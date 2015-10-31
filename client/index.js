import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, Link } from 'react-router';

import Importer from './src/importer.jsx';
import Main from './src/main.jsx';
import Sectioned from './src/sectioned.jsx';

document.addEventListener('DOMContentLoaded', setup);

function setup() {
  // React.render(
  //   <Router history={createBrowserHistory()}>
  //     <Route path="/" component={Sectioned}/>
  //   </Router>,
  React.render(
    <Sectioned/>,
    document.getElementById("example")
  );
}
