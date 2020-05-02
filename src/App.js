import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import './App.css';
import LandingPage from './hoc/layouts/landingpage_h'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFF00',
    },
    secondary: {
      main: '#FFFF00',
    }
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <LandingPage/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;