import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './layouts/LandingPage/landingpage_h';
import SignupPage from './layouts/SignupPage/signup_h';
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h';
import StorePage from './layouts/StorePage/storePage_h';
import SharedPage from './layouts/SharedPage/shared_h';
import CartPage from './layouts/CartPage/cart_h';

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
            <Route path="/room/:roomID" exact component={SharedPage} />
            <Route path="/cart" exact component={CartPage} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
