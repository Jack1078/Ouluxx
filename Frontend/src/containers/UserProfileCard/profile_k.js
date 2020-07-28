/*
Email sign up box container
Contains: email signup textfield, sign up button,
    continue with facebook button, continue with google button
*/

import React, { useState } from 'react';
import classes from './profile_k.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Input } from '@material-ui/core';
import { Row, Col, Container, Card, Button, Modal } from 'react-bootstrap';
import Textfield from '../../components/textfield_c';



const Profile = () => {


    const [email, setEmail] = useState("Not logged in!")
    const [name, setName] = useState("not added")
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [zip, setZip] = useState("")


    //return the fetch to return the promise
    const Get_User = (json_data) => {
        return fetch("/users/get_user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(json_data),
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((respData) => {
            console.log(JSON.parse(respData));

            return JSON.parse(respData);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };


    //create the promise, then work on the promise
    //all working on the response must occur in an async function like this. 
    var testing = Get_User();
    testing.then((response) => {
        console.log(response);
        testing = response;
        //console.log(testing)
        var n = testing.FirstName + " " + testing.LastName
        setEmail(testing.Email);
        setName(n);
        setZip(testing.Zipcode);
        setAddress(testing.Address);
        setCountry(testing.name);
        setState(testing.State);

    })

    //popup states
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Card border="dark">
                <Card.Body>
                    <Card.Title><strong>Profile</strong></Card.Title>
                    <ul className={classes.infolist}>
                        <li>Name: {name}  </li>
                        <li>Address: {address}</li>
                        <li>State: {state}</li>
                        <li>Zip Code: {zip} </li>
                        <li>Country: {country} </li>
                        <li>Email: {email} </li>

                    </ul>
                    <Button onClick={handleShow} variant="outline-primary" size="sm" className="float-right">Edit</Button>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} animation={true} size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={classes.form} action="/users/update" method="POST" >

                        <div className={classes.block}>
                            <Textfield
                                id="FirstName-textfield"
                                label="First Name"
                                name="FirstName"
                            />

                            <Button className="float-right" style={{ color: "white" }} variant="warning" type="submit">Update</Button>

                        </div>


                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default Profile;