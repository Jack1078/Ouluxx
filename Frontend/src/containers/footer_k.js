import React from 'react';
import Logo from '../images/ouluxxLogo.png';
import location_icon from '../images/locationPin.png';
import help_icon from '../images/questionmark.png';
import classes from '../containers/footer_k.module.css';
import { Row, Col, Container, Dropdown, Button, Input } from 'react-bootstrap';




function Footer() {
    return (
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
            </div>
        </div>
    );
}

export default Footer;