import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/shards-ui/dist/css/shards.min.css"
import NavBar from './components/NavBar';
import SearchLayout from './layouts/SearchLayout';
import NewCommunity from './components/NewCommunity';

class App extends React.Component {

  render() {
    return (
      <Router>
         <NavBar />
         <Route exact path="/" component={SearchLayout} />
         <Route exact path="/new" component={NewCommunity} />
      </Router>
    );
  }
}

export default App;