import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthorPage from './components/AuthorPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/author/:id" component={AuthorPage} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
