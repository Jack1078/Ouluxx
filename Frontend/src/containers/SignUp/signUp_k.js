/*
Email sign up box container
Contains: email signup textfield, sign up button,
    continue with facebook button, continue with google button
*/

import React from 'react';
import {createMuiTheme, ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import Textfield from '../../components/textfield_c';
import Button from '../../components/button_c';
import FacebookIcon from '@material-ui/icons/Facebook';
import BackButton from '../../components/BackButton/backButton_c';
import {FaGoogle} from 'react-icons/fa';
import logo from '../../images/logo.png';
import classes from './signUp_k.module.css';

/**
 * Email sign up container
 */

const button_theme = createMuiTheme({
    palette: {
      primary: {main: '#3b5998'},
      secondary: {main: '#4285F4'},
    }
})
  
function SignUp() {
    return (
        <div className={classes.container}>
            {/* back to zip code page */}
            <div>
                <BackButton/>
            </div>

            {/* Email Sign up */}
            <form className={classes.form}>

                {/* Logo */}
                <span className={classes.title}>
                    <img
                        className={classes.logo}
                        src={logo}
                        alt="a logo"/>
                </span>

                {/* Location changes based on zip code */}
                <h1>Available in Syosset!</h1>
                <h2>Create an account to start shopping</h2>

                {/* Email textfield: enter email to sign up */}
                <div className={classes.block}>
                    <Textfield
                        className={classes.textfield}
                        id="email-textfield"
                        label="Email"/>
                </div>

                {/* Email textfield: enter email to sign up */}
                <div className={classes.block}>
                    <p style={{textAlign: "center"}}>By signing up, you agree to our <a href=".">Terms of Service</a> & <a href=".">Privacy Policy</a></p>
                </div>
                <div className={classes.block}>
                    <Button
                        id="signup_button"
                        text="Sign up with email"
                        color="primary"
                        fontColor="white"/>
                </div>

                <div className={classes.or_block}>
                    <div className={classes.or}>or</div>
                    <div className={classes.line}></div>
                    <div className={classes.line} style={{right:"0"}}></div>
                </div>

                {/* Sign up with facebook or google account */}
                <MuiThemeProvider theme={button_theme}>
                    <div className={classes.block}>
                        <Button
                            id="facebook_signup_button"
                            text="Continue with Facebook"
                            color="primary"
                            startIcon={<FacebookIcon/>}/>
                    </div>
                    <div className={classes.block}>
                        <Button
                            id="facebook_signup_button"
                            text="Continue with Google"
                            color="secondary"
                            startIcon={<FaGoogle color="white"/>}/>
                    </div>
                </MuiThemeProvider>

                {/* Log in option */}
                <div className={classes.login}>
                    Already have an account? <a href=".">Log in</a>
                </div>
            </form>
        </div>
    );
}
  
export default SignUp;