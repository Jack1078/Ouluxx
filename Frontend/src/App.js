import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import LandingPage from './layouts/LandingPage/landingpage_h';
import SignupPage from './layouts/SignupPage/signup_h';
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        {/* <LandingPage />*/}
        <SignupPage />
        {/*<SelectionPage/>*/}
      </MuiThemeProvider>
    </div>
  );
}

export default App;
