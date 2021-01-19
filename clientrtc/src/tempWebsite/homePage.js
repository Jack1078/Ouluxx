import React, { useState } from 'react';
import classes from '../tempWebsite/homePage_style.module.css';
import { Button, Container, Row, Col, Image, InputGroup, FormControl, Form, Jumbotron } from 'react-bootstrap';
import Navbar from './navbar';
import DemoImage from "../tempWebsite/images/flooop.png";
import Stripe3CollegePark from "../tempWebsite/images/Stripe3CollegePark.png";
import VideoImage from "../tempWebsite/images/videochat.png";


function Home() {

    return (
        <>
            <div className={classes.stickyNav}>
                <Navbar />
            </div>

            <div className={classes.box}>
                <Row>
                    <Col className={classes.leftcontainer} md={4}>

                        <h1 className={classes.text}>Building personal relationships made simple</h1>
                        <br></br>
                        <h6 className={classes.textdesc} >
                            Can't meet and shop as you would like to anymore? Are the "stay at home" restrictions keeping you too isolated from your colleagues, friends, family members, and clients? <br></br>Let Ouluxx revolutionize the way you communicate by landing you in a digital space of joyful experiences!
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
                                <Button type = 'submit' variant="warning">JOIN WAITLIST</Button>
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
                                height: "70%"
                            }} />

                        </Container>
                    </Col>
                </Row>
                <Row >
                <ul>
                    <h1>Offer a superb customer experience</h1>
                    <li>We create the opportunity for you to connect your ebrands and grow your businesses online!</li>
                    <li>We offer you visibility in the virtual space!</li>
                    <li>We connect family, friends, and loved ones anywhere in the world, from your home space via video chat!</li>
                </ul>
                </Row>
                <Row>
                    <p><h2>E-Commerce Made Easy</h2></p>
                    <p className={classes.LeftPara}>
                        The e-commerce industry cannot die! Get a boom through Ouluxx and keep in touch with manufacturers, suppliers, retailers, and shoppers effortlessly through virtual wheeling and dealing!
                    </p>
                    <p className={classes.LeftPara}>
                        Our brand would like to make sure your e-Commerce brands are out there and easy to reach. We want your business to grow as you will be able to sell more. So keep yourself visible on one or more of our video conferencing solutions now!
                    </p>
                    <p className={classes.LeftPara}>
                        It doesn't matter where you are in the world. Doing business is made easy with Ouluxx pulling you together, via video-conferencing. 
                    </p>
                    <p className={classes.LeftPara}>
                        Doing business in the various spheres of life can be a breeze! You don’t have to download an app! Let Ouluxx hook you up directly with zero hassle! Isn’t that convenient? This solution gives you time to do what you do best in your chosen field without worrying about how you will stay in touch with your stakeholders.
                    </p>
                </Row>
                <Row>
                    <p><h2>Connecting And Shopping Spree</h2></p>
                    <p className={classes.LeftPara}>
                        Imagine connecting with your friends at the same location, in the same store! Imagine excitedly comparing prices and choosing your favorite items, via video-conferencing! Then hop from there to another store, just by the touch of a button! So effortless! 
                    </p>
                </Row>
                <Row >
                    <Col className={classes.leftcontainer2} sm={12} >
                        <h5 id = 'Partners'>Our Partners</h5>
                        <Container className={classes.partners}>
                            <a href = 'https://www.stripe3.com/'><Image src={Stripe3CollegePark} /*roundedCircle*/ style={{ objectFit: "cover", width: "140px" }} /></a>
                        </Container>
                    </Col>
                </Row>
                <Row style={{ marginTop: "6%" }}>
                    <Col sm={12} >

                        <Jumbotron className={classes.jumbotron}>
                            <h1 id = 'AboutUS'>About Us</h1>
                            <p className={classes.AboutParagraph}>
                                <b>We launch This New Video Conferencing Initiative, In Addition to Our E-Commerce Brands. </b>
                            </p>
                            <br></br>
                                <p className={classes.AboutParagraph}>In this era of the COVID 19 pandemic, companies are struggling to stay afloat due to low productivity and government lockdown. The various sectors--private and public-- are stretching to find ways to stay in touchand keep the fabric of life going.
                            </p>
                            <p className={classes.AboutParagraph}>
                                At Ouluxx, we aim to be the magnet that brings these groups together and the glue that keeps them virtually in their connecting spaces. We make a video solution available to suit your every situation. Whether you are a client, a student, a professional, a business owner, or just the man or woman on the street trying to stay in touch with friends and family, Ouluxx is ready to connect you.
                            </p>
                            <p className={classes.AboutParagraph}> 
                                Most persons are unaware of how they can get access to e-commerce brands to shop via video-conferencing. We know that small e-commerce brands are preferred over giant corporations after listening to customers, professionals, friends, and family. So we launch our videoconference initiative to highlight e-commerce and other essential services.
                            </p>
                            <p className={classes.AboutParagraph}>
                                Say bye, bye to your lonely, secluded days. Welcome with open arms your platform of visual connectivity and the easy flow of business and friendships.
                             </p>
                             <p>
                                 
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