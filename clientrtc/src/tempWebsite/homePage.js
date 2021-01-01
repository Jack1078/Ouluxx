import React, { useState } from 'react';
import classes from '../tempWebsite/homePage_style.module.css';
import { Button, Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';
import Navbar from './navbar';
import DemoImage from "../tempWebsite/images/flooop.png";
import VideoImage from "../tempWebsite/images/videochat.png";


function Home() {

    return (
        <>
            <div style={{ width: "100%" }}>
                <Navbar />
            </div>

            <div className={classes.box}>
                <Row>
                    <Col className={classes.leftcontainer} md={4}>

                        <h1 className={classes.text}>Next Level Virtual Shopping Experiences</h1>
                        <br></br>
                        <h6 className={classes.textdesc} >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Gravida rutrum quisque non tellus.
                        </h6>
                        <br></br>
                        <br></br>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter your email..."
                                aria-label="email"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-dark">JOIN WAITLIST</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <p className={classes.desc}>Want to see a live demo? <strong><a href="#" style={{ textDecoration: "none", color: "black" }}>Click Here</a></strong></p>

                    </Col>
                    <Col sm={8} className={classes.rightcontainer}>
                        <div className={classes.backbox}></div>
                        <div className={classes.backborder}></div>

                        <Container className={classes.backimage}>
                            <Image src={VideoImage} rounded style={{
                                objectFit: "cover", width: "750px"
                            }} />

                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col className={classes.leftcontainer2} sm={12} >
                        <h5>Our Partners</h5>
                        <Container className={classes.partners}>
                            <Image src={DemoImage} roundedCircle style={{ objectFit: "cover", width: "140px" }} />

                            <Image src={DemoImage} roundedCircle style={{ objectFit: "cover", width: "140px" }} />

                            <Image src={DemoImage} roundedCircle style={{ objectFit: "cover", width: "140px" }} />

                            <Image src={DemoImage} roundedCircle style={{ objectFit: "cover", width: "140px" }} />
                        </Container>
                    </Col>
                </Row>
            </div>

        </>
    );
}

export default Home;