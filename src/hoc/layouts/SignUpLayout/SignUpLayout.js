import React from 'react';
import SignUpContainer from '../../../containers/SignUp/SignUpContainer'
import AboutContainer from '../../../containers/About/About';
import './SignUpLayout.css'

function SignUpLayout() {
    return (
        <div>
            <section className="SignUp">
                <SignUpContainer/>
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