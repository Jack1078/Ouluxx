/*
Email sign up box container
Contains: email signup textfield, sign up button,
    continue with facebook button, continue with google button
*/

import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Textfield from '../../components/textfield_c';
//import Button from '../../components/button_c';
import FacebookIcon from '@material-ui/icons/Facebook';
import BackButton from '../../components/BackButton/backButton_c';
import logo from '../../images/logo.png';
import classes from './login_k.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Input } from '@material-ui/core';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';



/**
 * Email sign up container
 */

const button_theme = createMuiTheme({
    palette: {
        primary: { main: '#3b5998' },
        secondary: { main: '#4285F4' },
    }
})


const userLogIn = () => {
    return (
        <>
            <div className={classes.container2}>

                <div className={classes.container}>
                    {/* back to zip code page 
            <div>
                <BackButton />
            </div>

            {/* Email Sign up */}
                    <form className={classes.form} action="/auth/login" method="POST" >

                        {/* Logo */}
                        <span className={classes.title} >
                            <a href="/" style={{ textDecoration: "none", color: "black" }}>
                                <h3><strong>OULUXX</strong></h3></a>
                            <h5>Shopping Reimagined</h5>

                        </span>



                        {/* Email/Password textfield: enter email to sign up */}
                        <div className={classes.block}>
                            <Textfield
                                className={classes.textfield}
                                id="email-textfield"
                                label="Email"
                                name="Email"
                                required
                            />
                        </div>
                        <div className={classes.block}>
                            <Textfield
                                className={classes.textfield}
                                label="Password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>


                        <div className={classes.block}>

                            <Button
                                id="signup_button"
                                variant="dark"
                                block
                            >Login</Button>
                        </div>

                        <div className={classes.or_block}>
                            <div className={classes.or}>or</div>
                            <div className={classes.line}></div>
                            <div className={classes.line} style={{ right: "0" }}></div>
                        </div>

                        {/* Sign up with facebook or google account----have to check if localhost is 4000 or 8000*/}
                        <MuiThemeProvider theme={button_theme}>
                            <div className={classes.block}>
                                <a href="http://localhost:8000/auth/facebook" style={{ textDecoration: "none" }}>
                                    <Button
                                        id="facebook_signup_button"
                                        variant="primary"
                                        block
                                    ><FaFacebookF /> login with Facebook</Button>
                                </a>
                            </div>
                            <div className={classes.block}>
                                <a href="http://localhost:8000/auth/google" style={{ textDecoration: "none" }}>
                                    <Button
                                        id="google_signup_button"
                                        variant="danger"
                                        block
                                    ><FaGoogle /> login with Google</Button>
                                </a>
                            </div>
                        </MuiThemeProvider>

                        {/* Log in option */}
                        <div className={classes.login}>
                            Don't have an account? <Link to="/signup"><a href=".">Sign Up</a></Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default userLogIn;