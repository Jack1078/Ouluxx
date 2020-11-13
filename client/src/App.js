import React, { useState, useEffect } from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './layouts/LandingPage/landingpage_h';
import SignupPage from './layouts/SignupPage/signup_k';
import LoginPage from './layouts/LoginPage/login_h';
import CartPage from './layouts/CartPage/cart_h';
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h';
import StorePage from './layouts/StorePage/storePage_h';
import SharedPage from './layouts/SharedPage/shared_h';
import AccountPage from './layouts/AccountPage/accountPage_h';

import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave
} from 'better-react-spinkit'
import 'bootstrap/dist/css/bootstrap.min.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

// default theme
const theme = createMuiTheme({
  palette: {
    primary: { main: '#fed330' },
    secondary: { main: '#4b4b4b' }
  }
});

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])


  return (
    <>
      {loading === false ? (
        <div className="App">

          <MuiThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/signup" exact component={SignupPage} />
                <Route path="/stores" exact component={SelectionPage} />
                <Route path="/stores/:store" exact component={StorePage} />
                <Route path="/stores/:store/room/:roomID" exact component={StorePage} />
                <Route path="/room/:roomID" exact component={SharedPage} />
                <Route path="/accountpage" component={AccountPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/cartpage" component={CartPage} />
              </Switch>
              {/* <LandingPage/> 
              <SignupPage />
              <LoginPage />
              <StorePage />
          {/* <SelectionPage/> */}
            </Router>

          </MuiThemeProvider>
        </div>
      ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CubeGrid size={40} color='black' />
          </div>
        )

      }
    </>
  );
}

export default App;
