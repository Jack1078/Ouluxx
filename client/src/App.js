
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import AccountPage from './layouts/AccountPage/accountPage_h'
import LandingPage from './layouts/LandingPage/landingpage_h'
import LoginPage from './layouts/LoginPage/login_h'
import SharedPage from './layouts/SharedPage/shared_h'
import SignupPage from './layouts/SignupPage/signup_h'
import StorePage from './layouts/StorePage/storePage_h'
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h'

function App() {
  const location = useLocation()

  return (
    <Switch>
      <Route path='/' exact component={LandingPage} />
      <Route path='/signup' exact component={SignupPage} />
      <Route path='/stores' exact component={SelectionPage} />
      <Route path='/stores/:store' exact component={StorePage} />
      <Route path='/stores/:store/room/:roomID' exact component={StorePage} />
      <Route path='/room/:roomID' exact component={SharedPage} />
      <Route path='/accountpage' component={AccountPage} />
      <Route path='/login' component={LoginPage} />
    </Switch>
  )
}

export default App
