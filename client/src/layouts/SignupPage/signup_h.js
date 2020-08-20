import React from 'react';
import SignUpContainer from '../../containers/SignUp/signup_k';
import AboutContainer from '../../containers/About/about_k';
import StoresNearbyContainer from '../../containers/StoresNearby/storesNearby_k';
import Button from '../../components/button_c';
import classes from './signup_h.module.css';
import Footer from './../../containers/footer_k';
import LoginPage from '../LoginPage/login_h';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

/**
 * Layout for the email sign up page
 */


function SignUp() {
    return (
        <div>
            <section className={classes.background_image}>
                <div className={classes.margin_left}>
                    <Link to="/login"><Button
                        className={classes.small_button}
                        id="login_button"
                        text="Log in"
                        color="primary"
                        fontColor="white"
                    /></Link>
                </div>
                <SignUpContainer />
                <StoresNearbyContainer />
            </section>
            <section className={[classes.background_white, classes.full_width].join(' ')}>
                <AboutContainer />
            </section>

            <Footer />

        </div>
    );
}

export default SignUp;