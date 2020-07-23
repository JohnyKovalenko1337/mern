import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, [])

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout
      }
    }>
      <Router>
        <MainNavigation />
        <main>
            {routes}        
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
