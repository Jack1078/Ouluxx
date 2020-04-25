import React from 'react';
import Logo from '../photos/icons/ouluxx logo.png';
import location_icon from '../photos/icons/location_pin.png';
import help_icon from '../photos/icons/questionmark.png';

function Footer() {
    return (
        <div style={{
            backgroundColor: "#FFF552",
            position: "absolute",
            width: "100%",
            left: 0,
            right: 0,
            bottom: 0,
            padding: 2,
            justifyContent: 'center', alignItems: 'center', margin: 0
        }}>
            {/* Ouluxx logo in the footer */}
            <div style={{ position: "relative", float: "left", padding: 0, paddingLeft: 60, paddingTop: 10 }}>
                <img src={Logo} alt="The circle Ouluxx logo" width="120" height="121" padding="0" />
            </div>

            {/* This section contains the button for becoming a shopper and the text next to it */}
            <div style={{ position: "relative", margin: "auto", right: 70 }}>
                <p style={{}}>Interested in a great way to make money?</p>
                <input type="submit" value="Become a Shopper"
                    style={{
                        backgroundColor: "#FFF552", border: "0px solid #282C33",
                        width: 200, borderRadius: 3,
                        padding: 10, color: "black",
                        borderWidth: 4, margin: "auto",
                    }} />
            </div>

            {/* This section modifies the left aligned div containing the Enter location and help links */}
            <div style={{ position: "relative", float: "left", paddingLeft: 60, }}>
                <p style={{ fontWeight: "bold", textAlign: "left" }}>
                    <img src={location_icon} alt="" width="17" height="17" />
                    <span> Enter your location</span></p>
                <p style={{ fontWeight: "bold", textAlign: "left" }}>
                    <img src={help_icon} alt="" width="13" height="16" />
                    <span> Help</span></p>
            </div>

            {/* This div contains the rows of links in the footer */}
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex", padding: 0, margin: 0 }}>
                <div style={{ position: "relative", float: "left", right: "16vh", textAlign: "left" }}>
                    <p style={{ fontWeight: "bold" }}>Locations</p>
                    <p style={{ fontWeight: "bold" }}>Terms</p>
                </div>
                <div style={{ position: "relative", float: "left", right: "16vh", textAlign: "left" }}>
                    <p style={{ fontWeight: "bold" }}>Reviews</p>
                    <p style={{ fontWeight: "bold" }}>Privacy</p>
                </div>
                <div style={{ position: "relative", float: "left", right: "16vh", textAlign: "left" }}>
                    <p style={{ fontWeight: "bold" }}>Contact</p>
                    <p style={{ fontWeight: "bold" }}>Careers</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;