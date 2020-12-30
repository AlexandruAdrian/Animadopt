// System
import React from 'react';
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import LandingPage from './components/LandingPage';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/app" component={AppLayout} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
