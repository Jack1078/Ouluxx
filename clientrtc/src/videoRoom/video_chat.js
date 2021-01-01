import React, { useState } from 'react';
import classes from '../videoRoom/video_chat.module.css';
import { Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';



function Room() {

    return (
        <>

            <div className={classes.box}>
                <br></br>
                <Row>
                    <ButtonGroup>
                        <Button variant="dark" size="sm">Camera & Microphone Access</Button>
                        <Button variant="light" size="sm">Create Room</Button>
                        <Button variant="success" size="sm">Join Room</Button>
                        <Button variant="danger" size="sm">Hang Up</Button>
                    </ButtonGroup>
                </Row>
                <br></br>

                <Row>
                    <Col sm={4}>
                        <Row>
                            <video id="localVideo" muted autoplay playsinline>Play</video>
                        </Row>
                    </Col>

                    <Col sm={8}>
                        <Row>
                            <iframe name="iframe_a" title="Iframe Example" style={{ border: "none", width: "900px", height: "700px" }}></iframe>

                            <p><a href="https://www.ouluxx.com/" target="iframe_a">ouluxx.com</a></p>
                        </Row>
                    </Col>
                </Row>
            </div>

        </>
    );
}

export default Room;