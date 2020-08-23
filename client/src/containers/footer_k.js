import React from 'react';
import Logo from '../images/ouluxxLogo.png';
import classes from './footer_k.module.css';
import { Row, Col, Container, Dropdown, Button, Input } from 'react-bootstrap';




function Footer() {
    return (
        <div className={classes.footer}>
            <div>
                <Row>
                    <Col sm={4}><h5><strong>OULUXX Inc.</strong></h5></Col>
                    <Col sm={1}>About</Col>
                </Row>
                <Row>
                    <Col sm={4}>&#169; 2020-2021</Col>
                    <Col sm={8}>2 of 2</Col>
                </Row>
            </div>
        </div>
    );
}

export default Footer;