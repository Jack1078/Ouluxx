import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import './App.css';
import SignUpLayout from './layouts/SignUpLayout/signUp_h'
import LandingPage from './hoc/layouts/landingpage_h'

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

        {/* <LandingPage/> */}

        <SignUpLayout />

      </MuiThemeProvider>
    </div>
  );
}

export default App;