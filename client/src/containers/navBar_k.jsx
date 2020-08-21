import React from 'react';
import PropTypes from 'prop-types';
import classes from './navBar_k.module.css';
import { MdStoreMallDirectory, MdAccountCircle } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Row, Col, Container, Dropdown, Button, Input } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ZipCodeForm from './../containers/zipcodeForm';
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

    );
}

export default NavBar;