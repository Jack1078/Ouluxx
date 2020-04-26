import React from 'react';
import SignUpContainer from '../../../containers/SignUp/SignUpContainer'
import AboutContainer from '../../../containers/About/About';
import StoresNearbyContainer from '../../../containers/StoresNearby/StoresNearby'
import Button from '../../../components/Button'
import './SignUpLayout.css'

function SignUpLayout() {
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
  
export default SignUpLayout;