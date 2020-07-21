import React from 'react';
import PropTypes from 'prop-types';
import classes from './navBar_k.module.css';
import { MdStoreMallDirectory, MdAccountCircle } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Row, Col, Container, Dropdown, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




/**
 * Navigation bar
 * @param {logoOnClick, storeOnClick, accountOnClick, cartOnClick} NavBar
 */

const NavBar = (props) => {

    const { logoOnClick, storeOnClick, accountOnClick, cartOnClick, ...other } = props

    return (
        <div className={classes.container} {...other}>
            <div className={classes.gradient_border}></div>
            <div className={classes.nav_bar}>
                <div className={classes.grid_5c}>

                    <div
                        className={classes.logo}
                        onClick={() => logoOnClick()}>
                        <strong> OULU<span style={{ color: '#FFC70D' }}>X</span>X</strong></div>


                    <div>
                        <Button variant="outline-warning" type="submit" >
                            <div className={classes.store_icon}>
                                <div className={classes.btn_icon}><MdStoreMallDirectory /></div>
                                <div className={classes.btn_txt}>Stores</div>
                            </div>
                        </Button>

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
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
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

NavBar.propTypes = {
    logoOnClick: PropTypes.func.isRequired,
    storeOnClick: PropTypes.func.isRequired,
    accountOnClick: PropTypes.func.isRequired,
    cartOnClick: PropTypes.func.isRequired,
}

export default NavBar;