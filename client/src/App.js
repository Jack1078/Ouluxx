
import React, { Fragment, useState } from 'react'
import Draggable from 'react-draggable'
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch
} from 'react-router-dom'
import uuid from 'react-uuid'
import VideoRoom from './containers/VideoRoom/videoroom_k'
import AccountPage from './layouts/AccountPage/accountPage_h'
import LandingPage from './layouts/LandingPage/landingpage_h'
import LoginPage from './layouts/LoginPage/login_h'
import SignupPage from './layouts/SignupPage/signup_h'
import StorePage from './layouts/StorePage/storePage_h'
import storePageClasses from './layouts/StorePage/storePage_h.module.css'
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h'

const storeRouteMatch = {
  path: ['/stores/:store', '/stores/:store/room/:roomID'],
  exact: true
}

function App() {
  // ! VideoRoom connection is maintained using React Router `location` obj
  const location = useLocation()
  const { state: videoState = {} } = location

  // Check if user is on store page
  const match = useRouteMatch(storeRouteMatch)

  // Get current store
  const [store] = useState(match?.params.store || videoState.store || null)

  // Create new video room and handle navigation
  const createRoom = location => {
    if (location.state?.roomID) return

    const newRoomID = uuid().replace('-', '')

    return {
      pathname: `/stores/${store}/room/${newRoomID}`,
      state: { store, roomID: newRoomID }
    }
  }

  return (
    <Fragment>
      <Draggable>
        <div className={storePageClasses.videoroom_sticky}>
          {(() => {
            if (videoState.store && videoState.roomID) {
              return <VideoRoom {...videoState} />
            }

            return match?.params.store && !match?.params.roomID && (
              <Link className={storePageClasses.btn_link} to={createRoom}>
                <div className={storePageClasses.btn_join}>
                  Create room
                </div>
              </Link>
            )
          })()}
        </div>
      </Draggable>


      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/signup' exact component={SignupPage} />
        <Route path='/stores' exact component={SelectionPage} />
        <Route path='/stores/:store' component={StorePage} />
        <Route path='/accountpage' component={AccountPage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </Fragment>
  )
}

export default App
