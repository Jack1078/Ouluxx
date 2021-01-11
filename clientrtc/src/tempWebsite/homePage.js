import React, { useState } from 'react';
import classes from '../tempWebsite/homePage_style.module.css';
import { Button, Container, Row, Col, Image, InputGroup, FormControl, Form, Jumbotron } from 'react-bootstrap';
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
                        <Form action="/mailchimp" method="POST">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter your email..."
                                aria-label="email"
                                aria-describedby="basic-addon2"
                                name = "Email"
                            />
                            <InputGroup.Append>
                                <Button type = 'submit' variant="outline-dark">JOIN WAITLIST</Button>
                            </InputGroup.Append>

                        </InputGroup>
                        </Form>
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
                <Row >
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
                <Row style={{ marginTop: "6%" }}>
                    <Col sm={12} >

                        <Jumbotron>
                            <h2>About Us</h2>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Eget aliquet nibh praesent tristique. Elit sed vulputate mi sit amet mauris commodo quis.
                            Nibh tellus molestie nunc non blandit massa enim nec dui. Gravida quis blandit turpis cursus
                            in hac habitasse platea dictumst. A pellentesque sit amet porttitor eget dolor. Vitae justo
                            eget magna fermentum iaculis eu. Imperdiet proin fermentum leo vel. Enim neque volutpat ac
                            tincidunt vitae semper quis lectus nulla. Aliquam ultrices sagittis orci a scelerisque purus.
                            Mauris cursus mattis molestie a iaculis. Eu mi bibendum neque egestas congue quisque egestas.
                             </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </div>

        </>
    );
}


function mySubmitHandler(event){ 
    /*
        The parameter event is the form element from the above reactJS code.

        On the submit of the form run this function. This function will interface with the form, and take the data and store it on the firebase firestore serverless DB. 
        event.target is an array of the submitted form, to get the values use .value 
    */
    event.preventDefault();
    var Email = event.target[0].value;

    alert(Email);
  }



export default Home;