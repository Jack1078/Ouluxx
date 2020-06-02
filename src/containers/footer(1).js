import React from 'react';
import Logo from '../photos/icons/ouluxx logo.png';
import location_icon from '../photos/icons/location_pin.png';
import help_icon from '../photos/icons/questionmark.png';
import './footer.css';

// position is aligned against the bottom, background color yellow, everything is centered
const footerbox = {
    backgroundColor: "#FFF552",
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
};

// // Yellow button, black border, rounded edges, slight padding, black text
// const shopperbutton = {
//     backgroundColor: "#FFF552",
//     border: "0px solid #282C33",
//     width: 200,
//     borderRadius: 3,
//     padding: 10,
//     color: "black",
//     borderWidth: 4,
//     margin: "auto",
// };

// // bold text
// const bold = {
//     fontWeight: "bold"
// };

// // bold text left aligned
// const boldLeft = {
//     fontWeight: "bold",
//     textAlign: "left"
// };

// // The rows of pages relative positioning, left aligned text, offset to be centered, float left
// const pagesRow = {
//     position: "relative",
//     float: "left",
//     right: "16vh",
//     textAlign: "left"
// };

// The box containing the pages, display is flexed, items are centered, no padding or margins
const pagesBox = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 0,
    margin: 0
};

// // pages in the bottom left corner, realtive positioning, left float, padding on the left
// const leftPages = {
//     position: "relative",
//     float: "left",
//     paddingLeft: 60,
// };

// // position is relative, left foat, padding on left and top only
// const footerLogo = {
//     position: "relative",
//     float: "left",
//     padding: 0,
//     paddingLeft: 60,
//     paddingTop: 10
// };

// const employment = {
//     position: "relative",
//     margin: "auto",
//     right: 70
// };

function Footer() {
    return (
        <div style={{ footerbox }}>
            {/* Ouluxx logo in the footer */}
            <div className="footerlogo">
                <img src={Logo} alt="Circle Ouluxx logo" width="120" height="121" padding="0" />
            </div>

            {/* This section contains the button for becoming a shopper and the text next to it */}
            <div id="employment">
                <p>Interested in a great way to make money?</p>
                <input type="submit" value="Become a Shopper"
                    id="shopperbutton" />
            </div>

            {/* This section modifies the left aligned div containing the Enter location and help links */}
            <div id="leftpages">
                <p className="boldLeft">
                    <img src={location_icon} alt="" width="17" height="17" />
                    <span> Enter your location</span></p>
                <p className="boldLeft">
                    <img src={help_icon} alt="" width="13" height="16" />
                    <span> Help</span></p>
            </div>

            {/* This div contains the rows of links in the footer */}
            <div style={{ pagesBox }}>
                <div className="pagesRow">
                    <p className="bold">Locations</p>
                    <p className="bold">Terms</p>
                </div>
                <div className="pagesRow">
                    <p className="bold">Reviews</p>
                    <p className="bold">Privacy</p>
                </div>
                <div className="pagesRow">
                    <p className="bold">Contact</p>
                    <p className="bold">Careers</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;