/*
Email sign up box container
Contains: email signup textfield, sign up button,
    continue with facebook button, continue with google button
*/

import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import BackButton from '../../components/BackButton/BackButton';
import {FaGoogle} from 'react-icons/fa';
import logo from '../../assets/images/OULUXX_LOGOi_sm.png';
import classes from './SignUpContainer.module.css';

const button_theme = createMuiTheme({
    palette: {
      primary: {main: '#3b5998'},
      secondary: {main: '#4285F4'},
    }
})
  
function SignUpContainer() {
    return (
        <div className={classes.SignUpContainer}>
            {/* back to zip code page */}
            <div>
                <BackButton/>
            </div>

            {/* Email Sign up */}
            <form className={classes.SignUpForm}>

                {/* Logo */}
                <span className={classes.SignUpTitle}>
                    <img
                        className={classes.Logo}
                        src={logo}
                        alt="logo"/>
                </span>

                {/* Location changes based on zip code */}
                <h1>Available in Syosset!</h1>
                <h2>Create an account to start shopping</h2>

                {/* Email textfield: enter email to sign up */}
                <div className={classes.Block}>
                    <Textfield
                        className={classes.Textfield}
                        id="email-textfield"
                        label="Email"/>
                </div>

                {/* Email textfield: enter email to sign up */}
                <div className={classes.Block}>
                    <p>By signing up, you agree to our <a href=".">Terms of Service</a> & <a href=".">Privacy Policy</a></p>
                </div>
                <div className={classes.Block}>
                    <Button
                        id="signup_button"
                        text="Sign up with email"
                        color="primary"
                        fontColor="white"/>
                </div>

                <div className={classes.OrBlock}>
                    <div className={classes.Or}>or</div>
                    <div className={classes.Line}></div>
                    <div className={classes.Line} style={{right:"0"}}></div>
                </div>

                {/* Sign up with facebook or google account */}
                <MuiThemeProvider theme={button_theme}>
                    <div className={classes.Block}>
                        <Button
                            id="facebook_signup_button"
                            text="Continue with Facebook"
                            color="primary"
                            startIcon={<FacebookIcon/>}/>
                    </div>
                    <div className={classes.Block}>
                        <Button
                            id="facebook_signup_button"
                            text="Continue with Google"
                            color="secondary"
                            startIcon={<FaGoogle color="white"/>}/>
                    </div>
                </MuiThemeProvider>

                {/* Log in option */}
                <div className={classes.LogIn}>
                    Already have an account? <a href=".">Log in</a>
                </div>
            </form>
        </div>
    );
}
  
export default SignUpContainer;