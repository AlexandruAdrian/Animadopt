// System
import React from 'react';
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import Register from './containers/Register';
import Login from './containers/Login';
import ConfirmationPage from './containers/ConfirmationPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users/activate/:id" component={ConfirmationPage} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
