//COPYRIGHT 2019 RICHARD HUNTER
//GNU PUBLIC LICENSE 3.0

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Blog } from './Blog.jsx';
import { PublicView } from './components/PublicView.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
          <Route exact path="/" component={Blog} />
          <Route exact path="/public" component={PublicView} />
        </Router>
    );
  }
}

{/* <Router>
<div>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/topics">Topics</Link>
    </li>
  </ul>

  <hr />


</div>
</Router> */}

export default App;
