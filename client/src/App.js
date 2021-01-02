// System
import React from 'react';
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
