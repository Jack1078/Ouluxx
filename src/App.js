import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import './App.css';
import LandingPage from './layouts/LandingPage/landingpage_h';
import SignupPage from './layouts/SignupPage/signup_h';

import StoreIcon from './components/storeIcon_c';

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
        {/*<LandingPage/>*/}
        {/*<SignupPage/>*/}
        <StoreIcon 
        name="Safeway" 
        categories={["Groceries","Produce","Organic"]}
        img_url="fairway.png"
        alt="cvs icon"
        onClick={()=>console.log('Store Icon clicked')}/>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
