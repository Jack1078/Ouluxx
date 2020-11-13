import React from 'react';
import Logo from '../images/ouluxxLogo.png';
import classes from './footer_k.module.css';
import { Row, Col, Container, Dropdown, Button, Input } from 'react-bootstrap';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';


function Footer() {
    return (
        <>

            <div className={classes.footer}>
                <div>
                    <Row>
                        <Col sm={4}><h5><strong>OULUXX Inc.</strong></h5></Col>
                        <Col sm={1}>About</Col>
                        <Col sm={1}>Dummy Text</Col>
                        <Col sm={1}>Dummy Text</Col>
                        <Col sm={4}>Dummy Text</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>&#169; 2020-2021</Col>
                        <Col sm={1}>Dummy Text</Col>
                        <Col sm={1}>Dummy Text</Col>
                        <Col sm={1}>Dummy Text</Col>
                        <Col sm={4}>Dummy Text</Col>
                    </Row>
                    <div style={{ width: "100%", paddingLeft: "22%", paddingTop: "12.5%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "40%" }}>

                            <Row>
                                <Col sm={1}><FacebookIcon fontSize="large" style={{ color: "rgb(255, 225, 56)" }} /></Col>
                                <Col sm={1}><InstagramIcon fontSize="large" style={{ color: "rgb(255, 225, 56)" }} /></Col>
                                <Col sm={1}><LinkedInIcon fontSize="large" style={{ color: "rgb(255, 225, 56)" }} /></Col>
                                <Col sm={1}><TwitterIcon fontSize="large" style={{ color: "rgb(255, 225, 56)" }} /></Col>
                            </Row>

                        </div>
                    </div>
                </div>

            </div>


            <div className={classes.border}></div>
        </>
    );
}

export default Footer;