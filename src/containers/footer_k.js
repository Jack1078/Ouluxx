import React from 'react';
import Logo from '../images/ouluxxLogo.png';
import location_icon from '../images/locationPin.png';
import help_icon from '../images/questionmark.png';

// Yellow background, aligned to bottom
const footerBox = {
    backgroundColor: "#FFF552",
    position: "relative",
    left: 0,
    right: 0,
    // bottom: 0,
    padding: 2,
    height: 250
};

// bold text
const bold = {
    fontWeight: "bold"
};

// bold and left aligned
const boldLeft = {
    fontWeight: "bold",
    textAlign: "left"
};

// relative positioning, floating to the left
const pagesLeft = {
    position: "relative",
    float: "left",
    paddingLeft: 60,
};

// realtive positioing, left float, padding left and top
const footerLogo = {
    position: "relative",
    float: "left",
    padding: 0,
    paddingLeft: 60,
    paddingTop: 10,
    paddingBottom: 3
};

// yellow background, black border, rounded edges, black text, auto margins
const shopperButton = {
    backgroundColor: "#FFF552",
    border: "0px solid #282C33",
    width: 200,
    borderRadius: 3,
    padding: 10,
    color: "black",
    borderWidth: 4,
    margin: "auto",
};

// aligned to center, flex display
const pages = {
    justifyContent: "center",
    display: "flex",
    padding: 0,
};

// relative positioning, offset to center, text aligned left
const pagesCol = {
    position: "relative",
    float: "left",
    right: "12.5vh",
    textAlign: "left",
};

// relative positioning, offset to center
const employment = {
    position: "relative",
    right: 70,
    padding: 20,
    paddingBottom: 50

};

function Footer() {
    return (
        <div style={footerBox}>
            <div>
                {/* Ouluxx logo in the footer */}
                <div style={footerLogo}>
                    <img src={Logo} alt="The circle Ouluxx logo" width="120" height="121" padding="0" />
                </div>

                {/* This section contains the button for becoming a shopper and the text next to it */}
                <div style={employment}>
                    <p style={{ textAlign: "center" }}>Interested in a great way to make money?</p>
                    <input type="submit" value="Become a Shopper"
                        style={shopperButton} />
                </div>
            </div>

            {/* This section modifies the left aligned div containing the Enter location and help links */}
            <div style={pagesLeft}>
                <p style={boldLeft}>
                    <img src={location_icon} alt="" width="17" height="17" />
                    <span> Enter your location</span></p>
                <p style={boldLeft}>
                    <img src={help_icon} alt="" width="14" height="17" />
                    <span> Help</span></p>
            </div>

            {/* This div contains the rows of links in the footer */}
            <div style={pages}>
                <div style={pagesCol}>
                    <p style={bold}>Locations</p>
                    <p style={bold}>Terms</p>
                </div>
                <div style={pagesCol}>
                    <p style={bold}>Reviews</p>
                    <p style={bold}>Privacy</p>
                </div>
                <div style={pagesCol}>
                    <p style={bold}>Contact</p>
                    <p style={bold}>Careers</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;