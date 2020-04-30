import React from 'react';
import SignUpContainer from '../../containers/SignUp/signUp_k'
import AboutContainer from '../../containers/About/about_k';
import StoresNearbyContainer from '../../containers/StoresNearby/storesNearby_k'
import Button from '../../components/button_c'
import './signUp_h.css'

/**
 * Layout for the email sign up page
 */

function SignUp() {
    return (
        <div>
            <section className="SignUp">
                <div className="login_bar">
                    <div className="login_div">
                        <Button
                            id="login_button"
                            text="Log in"
                            color="primary"
                            fontColor="white"
                        />
                    </div>
                    
                </div>
                <SignUpContainer/>
                <StoresNearbyContainer/>
            </section>
            <section className="About">
                <div className="Inner">
                    <AboutContainer/>
                </div>
            </section>
        </div>
    );
}
  
export default SignUp;