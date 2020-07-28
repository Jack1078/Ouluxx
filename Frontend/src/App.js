import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import LandingPage from './layouts/LandingPage/landingpage_h';
import SignupPage from './layouts/SignupPage/signup_h';
import LoginPage from './layouts/LoginPage/login_h';
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h';
import StorePage from './layouts/StorePage/storePage_h';
import AccountPage from './layouts/AccountPage/accountPage_h';

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// default theme
const theme = createMuiTheme({
  palette: {
    primary: { main: '#fed330' },
    secondary: { main: '#4b4b4b' }
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/landingpage" component={LandingPage} />
            <Route path="/storepage" component={StorePage} />
            <Route path="/selectionpage" component={SelectionPage} />
            <Route path="/accountpage" component={AccountPage} />

          </Switch>
          {/* <LandingPage/> 
              <SignupPage />
              <LoginPage />
              <StorePage />
          {/* <SelectionPage/> */}
        </Router>

      </MuiThemeProvider>
    </div>
  );
}

export default App;
