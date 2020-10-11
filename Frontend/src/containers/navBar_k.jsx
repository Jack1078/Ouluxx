import React from 'react';
import PropTypes from 'prop-types';
import classes from './navBar_k.module.css';
import { MdStoreMallDirectory, MdAccountCircle } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Row, Col, Form, Container, Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ZipCodeForm from '../components/zipcodeForm_c'
import Textfield from '../components/textfield_c';
import { BiSearchAlt } from 'react-icons/bi';







/**
 * Navigation bar
 * @param {logoOnClick, storeOnClick, accountOnClick, cartOnClick} NavBar
 */

const NavBar = (props) => {

    const { logoOnClick, storeOnClick, accountOnClick, cartOnClick, ...other } = props

    return (
        <>
            <div className={classes.container} {...other}>
                <div className={classes.gradient_border}></div>
                <div className={classes.nav_bar}>
                    <div className={classes.grid_5c}>

                        <div
                            className={classes.logo}
                            onClick={() => logoOnClick()}>
                            <strong style={{ color: 'black' }} > OULU<span style={{ color: '#FFC70D' }}>X</span>X</strong>
                        </div>

                        <div>
                            <span style={{ color: "black" }}>stores</span>
                            <span style={{ color: "black" }}>cart</span>


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
                        <div style={{ float: "right", width: "250px" }}>
                            <Row>
                                <Col sm={6}>
                                    <Form>
                                        <Row >
                                            <InputGroup className="mb-2">
                                                <FormControl id="zipcode" placeholder="Zip Code" />
                                                <InputGroup.Append>
                                                    <Button variant="warning" type="submit"> <BiSearchAlt /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Row>
                                    </Form>

                                </Col>
                                <Col sm={4}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            <span><MdAccountCircle /> <span> Account</span>
                                            </span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/accountpage">Profile</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Settings & Privacy</Dropdown.Item>
                                            <Dropdown.Item > <form action="/auth/logout" method="POST">
                                                <div>
                                                    <Button variant="outline-danger" type="submit" size="sm">Log Out</Button>
                                                </div>
                                            </form></Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </div>
                        {/*<form action="/auth / logout" method="POST">
                        <div>
                        <Button variant="outline-danger" type="submit">Log Out</Button>
                    </div>
                    </form>*/}
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
            </div >
        </>
    );
}

NavBar.propTypes = {
    logoOnClick: PropTypes.func.isRequired,
    storeOnClick: PropTypes.func.isRequired,
    accountOnClick: PropTypes.func.isRequired,
    cartOnClick: PropTypes.func.isRequired,
}

export default NavBar;