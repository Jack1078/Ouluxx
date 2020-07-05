import React from 'react'

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

function Zipcode() {
    return (
        <form>
            <label>
                <input type="text" name="zipcode" placeholder="Address or Zipcode"
                    style={zipcodeform} />
            </label>
            <br />
            <input type="submit" value="Continue"
                style={continuebutton} />
        </form>

    );
}

export default Zipcode;