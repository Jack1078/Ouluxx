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
import classes from './signUp_k.module.css';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Input } from '@material-ui/core';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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


function SignUp() {
    return (
        <div className={classes.container}>
            {/* back to zip code page 
            <div>
                <BackButton />
            </div>*/}

            {/* Email Sign up  <strong style={{ color: 'black' }} > OULU<span style={{ color: '#FFC70D' }}>X</span>X</strong>*/}
            <form className={classes.form} action="/auth/register" method="POST" >

                {/* Logo */}
                <div className={classes.logo}>
                    <h3 style={{ color: 'black', fontWeight: "600" }}>OULUXX</h3>

                    {/* <h3 style={{ color: 'black', fontWeight: "600" }} > OULU<span style={{ color: '#FFC70D', fontWeight: "600" }}>X</span>X</h3>

                     <img src={require(`../../images/logo1.png`)} width="180" ></img>*/}

                </div>


                {/* Location changes based on zip code */}
                <h4>Shopping Reimagined</h4>

                {/* First/last Name textfield: enter password to sign up */}
                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        label="First Name"
                        name="FirstName"
                        type="text"

                    />
                </div>
                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        label="Last Name"
                        name="LastName"
                        type="text"

                    />
                </div>


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

                    <Textfield
                        className={classes.textfield}
                        label="Zip Code"
                        name="Zipcode"
                        type="text"
                        required
                    />
                </div>



                <div className={classes.block}>
                    <p style={{ textAlign: "center" }}>By signing up, you agree to our <a href=".">Terms of Service</a> & <a href=".">Privacy Policy</a></p>
                </div>
                <div className={classes.block}>
                    {/*} <Button
                        id="signup_button"
                        text="Sign up with email"
                        color="primary"
                        fontColor="white"
                        type="submit" />*/}
                    <Button
                        id="signup_button"
                        variant="dark"
                        type="submit"
                        block
                    >Sign up with email</Button>
                </div>

                <div className={classes.or_block}>
                    <div className={classes.or}>or</div>
                    <div className={classes.line}></div>
                    <div className={classes.line} style={{ right: "0" }}></div>
                </div>

                {/* Sign up with facebook or google account */}
                <MuiThemeProvider theme={button_theme}>
                    <div className={classes.block}>
                        <a href="http://localhost:4000/auth/facebook" style={{ textDecoration: "none" }}>
                            <Button
                                id="facebook_signup_button"
                                variant="primary"
                                block
                            ><FaFacebookF /> login with Facebook</Button>
                        </a>
                    </div>
                    <div className={classes.block}>
                        <a href="http://localhost:4000/auth/google" style={{ textDecoration: "none" }} >
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
                    Already have an account? <Link to="/login"><a href=".">Log in</a></Link>
                </div>
            </form>
        </div >
    );
}

export default SignUp;