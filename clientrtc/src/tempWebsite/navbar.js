import React, { useState } from 'react';
import classes from '../tempWebsite/navbar_style.module.css';
import { Row, Col, Form, Button, Container, Navbar, FormControl, Modal, Dropdown } from 'react-bootstrap';

import firebase from './../Firebase.js'
function Nav() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="light" variant="light" className="justify-content-between" style={{ borderBottom: "4px solid rgb(255, 232, 27)" }}>
                <Navbar.Brand href="/" >
                    <Container style={{ display: "flex", width: 100 }}>
                        <strong>Ouluxx VideoChat</strong></Container>
                </Navbar.Brand>
                <Container className="justify-content-end">
                    <Form inline>
                        <Container className={classes.link}><a href="#" style={{ textDecoration: "none", color: "black" }}>HOME</a></Container>
                    </Form>

                    <Form inline>
                        <Container className={classes.link}><a href="#AboutUS" style={{ textDecoration: "none", color: "black" }}>ABOUT US</a></Container>
                    </Form>
                    <Form inline>
                        <Container className={classes.link}><a href="#Partners" style={{ textDecoration: "none", color: "black" }}>OUR PARTNERS</a></Container>
                    </Form>
                    <Form inline>
                        <Container className={classes.link}><a href="#" style={{ textDecoration: "none", color: "black" }}><Button variant="warning" style={{ fontWeight: "600" }}
                            onClick={handleShow}>REGISTER YOUR STORE</Button></a></Container>
                    </Form>
                </Container>


            </Navbar>
            <Modal show={show}
                onHide={handleClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title ><Container style={{ display: "flex", justifyContent: "center" }}>Store Registration</Container></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{ fontSize: "0.8rem", display: "flex", justifyContent: "center" }}>  <p>Your store submission will be reviewed before we post it on the marketplace.
                    This may take 2-5 days.*</p>
                    </Container>
                    <br></br>
                    <Container>
                        <Form onSubmit={mySubmitHandler}>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="Name">
                                    <Form.Label>Owner Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter full name" />
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="StoreName">
                                    <Form.Label>Store Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter store name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group as={Col} md="8" controlId="WebURL">
                                    <Form.Label>Website URL</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="City">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="City" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid city.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="State">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" placeholder="State" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="Zip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="text" placeholder="Zip" required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid zip.
                                  </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12" controlId="StoreDescrip" required>
                                    <Form.Label>Store Description</Form.Label>
                                    <Form.Control as="textarea" rows={4} />
                                </Form.Group>
                            </Form.Row>
                            <br></br>
                            <Form.Row>
                                <Form.Group as={Col} md="12" id="formGridCheckbox" required>
                                    <Form.Check type="checkbox" label="I agree to let Ouluxx promote my business via this marketplace *" />
                                </Form.Group>

                            </Form.Row>
                            <br></br>
                            <Button variant="warning" type="submit" /*onClick={handleClose} */block>
                                Register
                           </Button>

                        </Form>

                    </Container>
                    <br></br>
                </Modal.Body>

            </Modal>
        </>
    );
}
var db = firebase.firestore();

/*
    This is the function for handling the submit of the form. The submit of the form is done by pressing the button. 
*/

function mySubmitHandler(event){ 
    /*
        The parameter event is the form element from the above reactJS code.

        On the submit of the form run this function. This function will interface with the form, and take the data and store it on the firebase firestore serverless DB. 
        event.target is an array of the submitted form, to get the values use .value 
    */
    event.preventDefault();
    var ownername = event.target[0].value;
    var sname = event.target[1].value;
    var email = event.target[2].value;
    var weburl = event.target[3].value;
    var city = event.target[4].value;
    var state = event.target[5].value;
    var zip = event.target[6].value;
    var storedesc = event.target[7].value;
    const StoreRegistration = db.collection("Stores").doc(sname);
    StoreRegistration.set({
            StoreName: sname,
            URL: weburl,
            Owners_Name: ownername, 
            Email: email, 
            City: city, 
            State: state, 
            Zip: zip, 
            Store_Description: storedesc
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
  }

export default Nav;