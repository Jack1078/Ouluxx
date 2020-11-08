import React, { useState } from 'react';
import classes from './navBar_k.module.css';
import { MdAccountCircle } from 'react-icons/md'
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';


/**
 * Navigation bar
 * @param {} NavBar
 */

const NavBar = (props) => {
    const [state, setState] = useState({
        zipcode: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        // console.log("Props: ", props);
        event.preventDefault();
        props.history.push({
            pathname: '/stores',
            state
        });
        window.location.reload();
    };

    const { ...other } = props

    return (
        <div className={classes.container} {...other}>
            <div className={classes.gradient_border}></div>
            <div className={classes.nav_bar}>
                <div className={classes.grid_5c}>

                    <a href="/stores" style={{ textDecoration: "none", color: "white" }}>
                        <div className={classes.logo}>
                            <strong> OULU<span style={{ color: '#FFC70D' }}>X</span>X</strong>
                        </div>
                    </a>

                    <div>

                        <div >
                            <form onSubmit={handleSubmit}>
                                <Row >
                                    <Col sm={10}>
                                        <TextField
                                            className={classes.textfield}
                                            name="zipcode"
                                            type="text"
                                            label="Zipcode"
                                            size="small"
                                            fontColor="white"
                                            placeholder="Zipcode"
                                            inputProps={{ pattern: "^[0-9]{5}" }}
                                            error={state.zipcode.length > 5 || (/[^0-9]/g).test(state.zipcode)}
                                            value={state.zipcode}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            required
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
import { MdStoreMallDirectory, MdAccountCircle } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Row, Col, Form, Container, Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ZipCodeForm from '../components/zipcodeForm_c'
import Textfield from '../components/textfield_c';
import { BiSearchAlt } from 'react-icons/bi';




const NavBar = (props) => {


    return (
        <>
            <div className={classes.container}>
                <div className={classes.nav_bar}>
                    <div className={classes.grid_5c}>

                        <div
                            className={classes.logo}
                        >
                            <strong style={{ color: 'black' }} > OULU<span style={{ color: '#FFC70D' }}>X</span>X</strong>
                        </div>

                        <div></div>

                        <div className={classes.links}>
                            <ul style={{ display: "flex" }} >
                                <li style={{ marginTop: "5%" }} ><Container> <a href="/" style={{ color: "black", textDecoration: "none" }}  > Home</a></Container></li>
                                <li style={{ marginTop: "5%" }} ><Container> <a href="/storepage" style={{ color: "black", textDecoration: "none" }} > Stores</a></Container></li>
                                <li style={{ marginTop: "5%" }}><Container > <a href="/cartpage" style={{ color: "black", textDecoration: "none" }} > Cart</a></Container></li>
                                <li style={{ marginTop: "5%" }}><Container > <a href="/cartpage" style={{ color: "black", textDecoration: "none" }}> About</a></Container></li>
                            </ul>
                        </div>
                        {/* <div
                        className={[classes.btn, classes.store_btn].join(' ')}
                        onClick={() => storeOnClick()}>
                        <Row className="justify-content-center">
                            <div className={classes.btn_icon}><MdStoreMallDirectory /></div>
                            <div className={classes.btn_txt}>Stores</div>
                        </Row>
                    </div> */}
                    <div style={{ float: "right", width: "250px" }}>
                        <Row>
                            <Col sm={6}>
                                <Form>
                                    <Row >
                                        <InputGroup className="mb-2">
                                            <FormControl id="zipcode" placeholder="Zip Code" />
                                            <InputGroup.Append>
                                                <Button variant="warning" type="submit" style={{ color: "white" }}> <BiSearchAlt /></Button>
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
            <div className={classes.gradient_border}></div>

        </div >
        </>
    );
}

export default NavBar;