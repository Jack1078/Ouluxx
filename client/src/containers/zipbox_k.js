import React from 'react'
import ZipCodeForm from '../components/zipcodeForm_c'
import CompanyName from '../components/companyName_c'
import '../layouts/LandingPage/landingpage.module.css'


// centered, thin border with shadow, text centered
const zipbox = {
    margin: "auto",
    width: 400,
    textAlign: "center",
    color: "#282C33",
    border: "0px solid #282C33",
    boxShadow: "0px 0px 10px",
    padding: 20,
    marginTop: 50,
    marginBottom: 50

};


// bold text with brown coloring
const hyperlink = {
    color: "#CE842D",
    fontWeight: "bold"
};

const fontA = {
    fontFamily: "Verdana",
    fontSize: 20,
    marginBottom: 10,
}

const fontB = {
    fontFamily: "Verdana",
    textAlign: "center",
    marginBottom: 10,
}


function zipBox() {
    return (
        <div style={zipbox}>

            <CompanyName />
            <h3 style={fontA}>Delivery made classy.</h3>
            <ZipCodeForm />

            <p style={fontB}>Already have an account? <span style={hyperlink}> Log In</span> </p>

        </div>
    );
}

export default zipBox;