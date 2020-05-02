import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import SignUpLayout from './layouts/SignupLayout/signup_h'

// default theme
const theme = createMuiTheme({
  palette: {
    primary: {main: '#fed330'},
    secondary: {main: '#4b4b4b'}
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <SignUpLayout/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
