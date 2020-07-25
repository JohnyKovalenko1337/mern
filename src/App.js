import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExperationTime, setTokenExperationTime] = useState();
  const [userId, setUserId] = useState();



  const login = useCallback((uid, token, experationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpire = experationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExperationTime(tokenExpire);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
      experation: tokenExpire.toISOString()
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExperationTime(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if(token && tokenExperationTime){
      const remainingTime = tokenExperationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }
    else{
      clearTimeout(logoutTimer);
    }
  },
    [token, logout, tokenExperationTime])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.experation) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.experation));
    }
  },
    [login]);

  let routes;

  if (token) {
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
        isLoggedIn: !!token,
        token: token,
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
