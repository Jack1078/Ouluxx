import React from 'react'
// import ContinueButton from '../components/continueButton'
// import LoginButton from './../components/loginButton'
import ZipCodeForm from '../components/zipcodeForm'
import CompanyName from '../components/companyName'

function zipBox() {
    return (
        <div id='main'
            style={{
                margin: "auto",
                width: 400,
                // top: 200,
                textAlign: "center",
                // position: "relative",
                color: "#282C33",
                // backgroundColor: "#282C33",
                border: "0px solid #282C33",
                boxShadow: "0px 0px 10px"
            }}>

            <CompanyName />
            <h3>Delivery made classy.</h3>
            <ZipCodeForm />

            <p>Already Have an account? <span style={{ color: "#CE842D", fontWeight: "bold" }}> Log In</span> </p>

        </div>
    );
}

export default zipBox;