/*
Email sign up box container
Contains: email signup textfield, sign up button,
    continue with facebook button, continue with google button
*/

import React, { useState, setState } from 'react';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Textfield from '../../components/textfield_c';
import Button from '../../components/button_c';
import FacebookIcon from '@material-ui/icons/Facebook';
import BackButton from '../../components/BackButton/backButton_c';
import { FaGoogle } from 'react-icons/fa';
import logo from '../../images/logo.png';
import classes from './signUp_k.module.css';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Input } from '@material-ui/core';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



/**
 * Email sign up container
 */

const button_theme = createMuiTheme({
    palette: {
        primary: { main: '#3b5998' },
        secondary: { main: '#4285F4' },
    }
})

const SignUp = (props) => {
    const { zipcode } = props;
    // console.log("data =", props);
    const [state, setState] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        username: '',
        password: '',
        Zipcode: zipcode
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className={classes.container}>
            {/* back to zip code page */}
            <div>
                <br />
                {/* <BackButton /> */}
            </div>

            {/* Email Sign up */}
            <form className={classes.form} action="/auth/register" method="POST" >

                {/* Logo */}
                <span className={classes.title}>
                    <a href="/">
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="a logo"
                        /></a>
                </span>

                {/* Location changes based on zip code */}
                <h1>Available in Syosset!</h1>
                <h2>Create an account to start shopping</h2>

                {/* First/last Name textfield: enter password to sign up */}
                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        label="First Name"
                        name="FirstName"
                        type="text"
                        value={state.FirstName}
                        onChange={handleChange}

                    />
                </div>
                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        label="Last Name"
                        name="LastName"
                        type="text"
                        value={state.LastName}
                        onChange={handleChange}

                    />
                </div>


                {/* Email/Password textfield: enter email to sign up */}
                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        id="email-textfield"
                        label="Email"
                        name="Email"
                        value={state.Email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        label="Username"
                        name="username"
                        type="text"
                        value={state.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        label="Password"
                        name="password"
                        type="password"
                        value={state.password}
                        onChange={handleChange}
                        required

                    />
                </div>

                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        label="Zipcode"
                        name="Zipcode"
                        type="text"
                        value={state.Zipcode}
                        onChange={handleChange}
                        error={state.Zipcode.length > 5 || (/[^0-9]/g).test(state.Zipcode)}
                        required
                    />
                </div>



                <div className={classes.block}>
                    <p style={{ textAlign: "center" }}>By signing up, you agree to our <a href=".">Terms of Service</a> & <a href=".">Privacy Policy</a></p>
                </div>
                <div className={classes.block}>
                    <Button
                        id="signup_button"
                        text="Sign up with email"
                        color="primary"
                        fontColor="white"
                        type="submit" />
                </div>

                <div className={classes.or_block}>
                    <div className={classes.or}>or</div>
                    <div className={classes.line}></div>
                    <div className={classes.line} style={{ right: "0" }}></div>
                </div>

                {/* Sign up with facebook or google account */}
                <MuiThemeProvider theme={button_theme}>
                    <div className={classes.block}>
                        <a href="http://localhost:8000/auth/facebook" >
                            <Button
                                id="facebook_signup_button"
                                text="Continue with Facebook"
                                color="primary"
                                startIcon={<FacebookIcon />}
                            />
                        </a>
                    </div>
                    <div className={classes.block}>
                        <a href="http://localhost:8000/auth/google" >
                            <Button
                                id="google_signup_button"
                                text="Continue with Google"
                                color="secondary"
                                startIcon={<FaGoogle color="white" />}
                            />
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