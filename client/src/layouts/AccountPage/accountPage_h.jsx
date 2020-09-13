import React, { useState } from 'react';
import { Component } from 'react'
import classes from './accountPage_h.module.css';
import NavBar from '../../containers/navBar_k';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from '../../containers/UserProfileCard/profile_k';
import UserPaymentInfoCard from '../../containers/UserPaymentInfoCard/paymentInfo_k';





const UserAccount = (props) => {
    return (
        <div className={classes.background}>
            <NavBar {...props} />


            {/*will need to create components for the containers below*/}

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
    );

}

export default UserAccount;