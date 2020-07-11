import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
