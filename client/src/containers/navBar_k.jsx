import React, { useState } from 'react'
import { Button, Col, Dropdown, Row } from 'react-bootstrap'
import { MdAccountCircle } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import Textfield from '../components/textfield_c'
import classes from './navBar_k.module.css'

/**
 * Navigation bar
 * 
 * @param {object} props - Component properties 
 */
const NavBar = props => {
  const { state: locationState = {} } = useLocation()

  const [state, setState] = useState({
    zipcode: ''
  })

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = event => {
    // console.log("Props: ", props);
    event.preventDefault()
    props.history.push({
      pathname: '/stores',
      state: { ...state, ...locationState }
    })
  }

  const { ...other } = props

  return (
    <div className={classes.container} {...other}>
      <div className={classes.gradient_border}></div>
      <div className={classes.nav_bar}>
        <div className={classes.grid_5c}>
          <Link
            to={location => ({
              ...location, pathname: '/stores', state: locationState
            })}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div className={classes.logo}>
              <strong>
                {' '}OULU<span style={{ color: '#FFC70D' }}>X</span>X
              </strong>
            </div>
          </Link>

          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={10}>
                    <Textfield
                      className={classes.textfield}
                      name='zipcode'
                      type='text'
                      label='Zipcode'
                      size='small'
                      fontColor='white'
                      placeholder='Zipcode'
                      inputProps={{ pattern: '^[0-9]{5}' }}
                      error={
                        state.zipcode.length > 5 ||
                        /[^0-9]/g.test(state.zipcode)
                      }
                      value={state.zipcode}
                      onChange={handleChange}
                      autoComplete='off'
                      required
                    />
                  </Col>
                  <Col xs={1}>
                    <Button variant='warning' type='submit'>
                      {' '}
                      Search
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
          {/* <div
                        className={[classes.btn, classes.store_btn].join(' ')}
                        onClick={() => storeOnClick()}>
                        <Row className="justify-content-center">
                            <div className={classes.btn_icon}><MdStoreMallDirectory /></div>
                            <div className={classes.btn_txt}>Stores</div>
                        </Row>
                    </div> */}

          <div></div>
          <Dropdown>
            <Dropdown.Toggle variant='outline-light' id='dropdown-basic'>
              <span>
                <MdAccountCircle /> <span> Account</span>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='/accountpage'>Profile</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>
                Settings & Privacy
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <form action='/auth/logout' method='POST'>
            <div>
              <Button variant='outline-danger' type='submit'>
                Log Out
              </Button>
            </div>
          </form>
          {/* <div
                        className={classes.btn}
                        onClick={() => cartOnClick()}>
                        <Row className="justify-content-center">
                            <div className={classes.btn_icon}><AiOutlineShoppingCart /></div>
                            <div className={classes.btn_txt}>Cart</div>
                        </Row>
                    </div> */}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
