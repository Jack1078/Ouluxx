import React, { useState, useEffect } from 'react';
import { Component } from 'react'
import classes from './accountPage_h.module.css';
import NavBar from '../../containers/navBar_k';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from '../../containers/UserProfileCard/profile_k';
import UserPaymentInfoCard from '../../containers/UserPaymentInfoCard/paymentInfo_k';
import Footer from './../../containers/footer_k';
import Error from '../../containers/Error/error';



const UserAccount = () => {

    var temp = true;
    const [email, setEmail] = useState("Not logged in!")

    useEffect(() => {
        // console.log("Temp is undefined");
        get_user();
    }, []);

    //return the fetch to return the promise
    const get_user = () => {
        return fetch("/users/get_logged_in", {
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
            var temp = JSON.parse(respData);
            setEmail(temp.Email);
            return JSON.parse(respData);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };

    if (email === "Not logged in!") {
        temp = false;
    }


    return (
        <>
            {temp === true ? (
                <>
                    <div className={classes.background}>
                        <NavBar />
                        <div className={classes.maincontainer}>
                            <Row>
                                <Col lg={6}>
                                    <Profile />
                                </Col>
                                <Col lg={6}>
                                    <UserPaymentInfoCard />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Footer />
                </>
            ) : (
                    <Error />

                )

            }

        </>
    );
}

export default UserAccount;