import React from 'react'

// grey border around text input, rounded edges, white background, slight padding
const zipcodeform = {
    borderColorTop: "grey",
    borderBottomColor: "grey",
    borderRightColor: "grey",
    width: 250,
    borderRadius: 2,
    color: "white",
    padding: 10,
};
// rounded edges, yellow backgorund, slight padding
const continuebutton = {
    width: 275,
    borderRadius: 3,
    backgroundColor: "#FFF552",
    padding: 10
};

function Zipcode() {
    return (
        <form>
            <label>
                <input type="text" name="name" placeholder="Address or Zipcode"
                    style={zipcodeform} />
            </label>
            <br />
            <input type="submit" value="Continue"
                style={continuebutton} />
        </form>

    );
}

export default Zipcode;