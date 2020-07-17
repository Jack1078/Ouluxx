import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './layouts/LandingPage/landingpage_h';
import SignupPage from './layouts/SignupPage/signup_h';
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h';
import StorePage from './layouts/StorePage/storePage_h';

import VideoRoom from './containers/VideoRoom/videoroom_k';
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
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/stores" exact component={SelectionPage} />
            <Route path="/stores/:store" exact component={StorePage} />
            <Route path="/stores/:store/room/:roomID" exact component={StorePage} />
            <Route path="/:roomID" exact component={VideoRoom} /> // TODO: delete later
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
