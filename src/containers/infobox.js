import React from 'react'
import NearbyStores from './../components/nearbyStores'
import Promises from './../components/promises'
// import ContinueButton from '../components/continueButton'
// import LoginButton from './../components/loginButton'
// import ZipCodeForm from '../components/zipcodeForm'
// import CompanyName from '../components/companyName'

function infoBox() {
    return (
        <div style={{

            // width: 500,
            top: 200,
            textAlign: "center",
            position: "relative",
            color: "white",
            backgroundColor: "black",
            padding: 50,
            // justifyContent: "center"
        }}>
            <NearbyStores />
            <br />
            <Promises />
        </div>
    );
}

export default infoBox;