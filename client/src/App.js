// System
import React from 'react';
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import Register from './containers/Register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
