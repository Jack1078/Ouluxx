import React from 'react';
import PropTypes from 'prop-types';
import classes from './navBar_k.module.css';
import { MdAccountCircle } from 'react-icons/md'
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Textfield from '../components/textfield_c';

/**
 * Navigation bar
 * @param {} NavBar
 */

const NavBar = (props) => {

    const { ...other } = props

    return (
        <div className={classes.container} {...other}>
            <div className={classes.gradient_border}></div>
            <div className={classes.nav_bar}>
                <div className={classes.grid_5c}>

                    <Link to={'/'}>
                        <div className={classes.logo}>
                            OULU<span style={{ color: '#FFC70D' }}>X</span>X
                        </div>
                    </Link>


                    <div>

                        <div >
                            <form>
                                <Row >
                                    <Col sm={10}>
                                        <Textfield
                                            className={classes.textfield}
                                            label="Zip Code"
                                            name="Zip"
                                            size="small"
                                            fontColor="white"
                                        />
                                    </Col>
                                    <Col xs={1}>
                                        <Button variant="warning" type="submit"> Search</Button>
                                    </Col>
                                </Row>
                            </form>

                        </div>

                    </div>

                    <div></div>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                            <span><MdAccountCircle /> <span> Account</span>
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/accountpage">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Settings & Privacy</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <form action="/auth/logout" method="POST">
                        <div>
                            <Button variant="outline-danger" type="submit">Log Out</Button>
                        </div>
                    </form>
                    <div></div>

                </div>
            </div>
        </div>

    );
}

export default NavBar;