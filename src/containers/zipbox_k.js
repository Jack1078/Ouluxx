import React from 'react'
import ZipCodeForm from '../components/zipcodeForm_c'
import CompanyName from '../components/companyName_c'

// centered, thin border with shadow, text centered
const zipbox = {
    margin: "auto",
    width: 400,
    textAlign: "center",
    color: "#282C33",
    border: "0px solid #282C33",
    boxShadow: "0px 0px 10px"
};


// bold text with brown coloring
const hyperlink = {
    color: "#CE842D",
    fontWeight: "bold"
};

function zipBox() {
    return (
        <div style={zipbox}>

            <CompanyName />
            <h3>Delivery made classy.</h3>
            <ZipCodeForm />

            <p>Already Have an account? <span style={hyperlink}> Log In</span> </p>

        </div>
    );
}

export default zipBox;