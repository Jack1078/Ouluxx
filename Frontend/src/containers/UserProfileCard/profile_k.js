/*
Email sign up box container
Contains: email signup textfield, sign up button,
    continue with facebook button, continue with google button
*/

import React, { useState } from 'react';
import classes from './profile_k.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Input } from '@material-ui/core';
import { Row, Col, Container, Card, Button, Modal, ListGroup } from 'react-bootstrap';
import Textfield from '../../components/textfield_c';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';


const Profile = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));
    const themeclass = useStyles();


    const [email, setEmail] = useState("Not logged in!")
    const [name, setName] = useState("not added")
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [zip, setZip] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")



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

        var n = testing.FirstName + " " + testing.LastName;
        var a = testing.Address + ", " + testing.State + " " + testing.Zipcode
        setEmail(testing.Email);
        setName(n);
        setZip(testing.Zipcode);
        setAddress(a);
        setCountry(testing.name);
        setState(testing.State);
        setFname(testing.FirstName);
        setLname(testing.LastName);
    })

    //popup states
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>

            <Card>
                <Card.Header className={classes.backgroundheader}></Card.Header>
                <Card.Body>
                    <Card.Title><strong>Profile</strong>
                        <Button onClick={handleShow} variant="outline-dark" size="sm" className="float-right">Edit</Button>
                    </Card.Title>
                    <div className={classes.root}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem
                                button>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                            <ListItem
                                button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={address} />
                            </ListItem>
                            <ListItem
                                button>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary={email} />
                            </ListItem>
                        </List>
                    </div>

                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} animation={true} size="md"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Info
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={classes.form} action="/users/update" method="POST" >

                        <div className={classes.block}>
                            <Row>
                                <Col sm={6}>
                                    <Textfield
                                        id="FirstName-textfield"
                                        label="First Name"
                                        name="FirstName"

                                    />
                                </Col>
                                <Col sm={6}>
                                    <Textfield
                                        id="LastName-textfield"
                                        label="Last Name"
                                        name="LastName"

                                    />
                                </Col>
                            </Row>
                            <Textfield
                                id="Address-textfield"
                                label="Address"
                                name="Address"
                            />
                            <Row>
                                <Col sm={6}>
                                    <Textfield
                                        id="City-textfield"
                                        label="City"
                                        name="City"
                                    />
                                </Col>
                                <Col sm={6}>

                                    <Textfield
                                        id="State-textfield"
                                        label="State"
                                        name="State"
                                    />
                                </Col>

                            </Row>
                            <Textfield
                                id="Zipcode-textfield"
                                label="Zip Code"
                                name="Zipcode"

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