
import React, { Fragment, useState } from 'react'
import Draggable from 'react-draggable'
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import uuid from 'react-uuid'
import VideoRoom from './containers/VideoRoom/videoroom_k'
import AccountPage from './layouts/AccountPage/accountPage_h'
import LandingPage from './layouts/LandingPage/landingpage_h'
import LoginPage from './layouts/LoginPage/login_h'
import SharedPage from './layouts/SharedPage/shared_h'
import SignupPage from './layouts/SignupPage/signup_h'
import StorePage from './layouts/StorePage/storePage_h'
import storePageClasses from './layouts/StorePage/storePage_h.module.css'
import SelectionPage from './layouts/StoreSelectionPage/storeSelectionPage_h'

function App() {
  // Check if user is on store page
  const { params } = useRouteMatch({
    path: ['/stores/:store', '/stores/:store/room/:roomID'],
    exact: true
  }) || {}

  // Get location to determine if video chat is enabled
  const location = useLocation()

  // User has video chat enabled
  const [hasRoom, setHasRoom] = useState(
    location.state?.store && location.state?.roomID
  )

  // User can create video room if on store page and not in a room
  const [canCreateRoom] = useState(!hasRoom && params?.store && !params?.roomID)


  return (
    <Fragment>
      <Draggable>
        <div className={storePageClasses.videoroom_sticky}>
          {(() => {
            if (hasRoom) return <VideoRoom />

            if (canCreateRoom) {
              const createRoom = location => {
                if (location.state) {
                  setHasRoom(true)
                  return
                }

                const roomID = uuid().replace('-', '')

                return {
                  pathname: `/stores/${params.store}/room/${roomID}`,
                  state: { store: params.store, roomID }
                }
              }

              return (
                <Link className={storePageClasses.btn_link} to={createRoom}>
                  <div className={storePageClasses.btn_join}>
                    Create room
                  </div>
                </Link>
              )
            }

            return null
          })()}
        </div>
      </Draggable>

      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/signup' exact component={SignupPage} />
        <Route path='/stores' exact component={SelectionPage} />
        <Route path='/stores/:store' component={StorePage} />
        <Route path='/room/:roomID' exact component={SharedPage} />
        <Route path='/accountpage' component={AccountPage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </Fragment>
  )
}

export default App
