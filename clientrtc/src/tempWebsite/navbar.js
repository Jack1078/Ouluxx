import React, { useState } from 'react';
import classes from '../tempWebsite/navbar_style.module.css';
import { Row, Col, Form, Button, Container, Navbar, FormControl, Image, Dropdown } from 'react-bootstrap';


function Nav() {


    return (
        <>
            <Navbar bg="light" variant="light" className="justify-content-between" style={{ borderBottom: "4px solid rgb(255, 232, 27)" }}>
                <Navbar.Brand href="/" >
                    <Container style={{ display: "flex", width: 100 }}>
                        <strong>OULUXX VIDEO CHAT </strong></Container>
                </Navbar.Brand>
                <Container className="justify-content-end">
                    <Form inline>
                        <Container className={classes.link}><a href="#" style={{ textDecoration: "none", color: "black" }}>HOME</a></Container>
                    </Form>

                    <Form inline>
                        <Container className={classes.link}><a href="#" style={{ textDecoration: "none", color: "black" }}>ABOUT US</a></Container>
                    </Form>
                    <Form inline>
                        <Container className={classes.link}><a href="#" style={{ textDecoration: "none", color: "black" }}>OUR PARTNERS</a></Container>
                    </Form>
                    <Form inline>
                        <Container className={classes.link}><a href="#" style={{ textDecoration: "none", color: "black" }}><Button variant="warning" style={{ fontWeight: "600" }}>REGISTER YOUR STORE</Button></a></Container>
                    </Form>
                </Container>


            </Navbar>

        </>
    );
}

export default Nav;