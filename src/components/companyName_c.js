import React from 'react'

// yellow text
const yellow = {
    color: "#FBF24E"
};

// black text
const black = {
    color: "#282C33"
};

function CompanyName() {
    return (
        <>
            <h1 style={black}>Oulu<span style={yellow}>x</span>x</h1>
        </>
    );
}

export default CompanyName; 