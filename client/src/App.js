// System
import React from 'react';
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import LandingPage from './components/LandingPage';
import Register from './containers/Register';
import Login from './containers/Login';
import ConfirmationPage from './containers/ConfirmationPage';
import AccountRecovery from './containers/AccountRecovery';
import PasswordReset from './containers/PasswordReset';
import NotFound from './components/NotFound';
import Dashboard from './containers/Dashboard';
// Context
import AuthContextProvider from './context/authContext';

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/users/activate/:id"
            component={ConfirmationPage}
          />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/recover"
            component={() => <AccountRecovery recover />}
          />
          <Route
            exact
            path="/activate"
            component={() => <AccountRecovery activate />}
          />
          <Route
            exact
            path="/users/password-reset/:id"
            component={PasswordReset}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
