import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';

// grey border around text input, rounded edges, white background, slight padding
const zipcodeform = {
    borderColorTop: "grey",
    borderBottomColor: "grey",
    borderRightColor: "grey",
    width: 250,
    borderRadius: 4,
    color: "black",
    padding: 10,
};
// rounded edges, yellow backgorund, slight padding
const continuebutton = {
    width: 275,
    borderRadius: 4,
    backgroundColor: "#FFF552",
    padding: 10,
    marginBottom: 0
};

// This reroutes to the stores page correctly, but doesn't transfer data yet
function Zipcode() {
    var userzipcode = 12345;
    return (
        <form>
            <label>
                <input type="text" name="zipcode" placeholder="Address or Zipcode"
                    style={zipcodeform} />
            </label>
            <br />
            {/* <input type="button" value="Continue" style={continuebutton} /> */}
            <Button style={continuebutton} component={Link} to={{ pathname: '/stores', data: userzipcode }}>Continue</Button>
        </form>

    );
}

export default Zipcode;