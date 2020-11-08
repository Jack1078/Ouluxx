import React, { useState, useEffect } from 'react';
import SignUpContainer from '../../containers/SignUp/signup_k';
import AboutContainer from '../../containers/About/about_k';
import StoresNearbyContainer from '../../containers/StoresNearby/storesNearby_k';
import Button from '../../components/button_c';
import classes from './signup_h.module.css';
import Footer from '../../containers/footer_k';
import { Link } from 'react-router-dom';
import Navbar from '../../containers/navBar_k';


/**
 * Layout for the email sign up page
 */


const SignUp = (props) => {
    // console.log("Props: ", props);
    // console.log("Signup Zipcode: ", props.location.state.zipcode);
    var temp = '';
    if (props.location && props.location.state && props.location.state.zipcode)
        temp = props.location.state.zipcode;
    const [zipcode, setZipcode] = useState(temp);

    const data = { zipcode }
    // console.log("Data =", data.zipcode);

    return (
        <div>

            <section className={classes.background_image}>


                {/*  <div className={classes.margin_left}>
                    <Link to="/login">
                        <Button
                            id="login_button"
                            variant="dark"
                        // startIcon={<FacebookIcon />}
                        >Log in</Button></Link>
                </div>*/}

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