import React from 'react'

// yellow text
const yellow = {
    color: "#FBF24E"
};

// black text
const black = {
    color: "#282C33"
};

const spacing = {
    padding: 10,
    fontSize: "50px"
}

function CompanyName() {
    return (
        <>
            <h1 style={black, spacing}>Oulu<span style={yellow}>x</span>x</h1>
        </>
    );
}

export default CompanyName; 