import React, { } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import Error from './components/Error/Error'
import './App.css';


const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={Main}
        />
        <Route
          exact
          path="/login"
          component={Login}
        />
        <Route
          component={Error}
        />
      </Switch>
    </div>
  );
}

export default App;
