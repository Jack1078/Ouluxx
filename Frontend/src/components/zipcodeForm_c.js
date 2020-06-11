import React from 'react'
import { Component } from 'react';

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


//function Zipcode() {

class Zipcode extends Component {
    handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Address: event.target.zipcode.value,
    };
    console.log(data);
    fetch("/users/test", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((respData) => {
      console.log(JSON.parse(respData));
    }).catch((err) => {
        console.log("janhkdfjhasjkdfhbsjdbfjhsdbfs");
      console.log(err);
    });
  }


  render(){
    return (
        <form onSubmit={event => this.handleSubmit(event)}>
            <label>
                <input type="text" name="zipcode" placeholder="Address or Zipcode"
                    style={zipcodeform} />
            </label>
            <br />

            <input type="submit" value="Continue"
                style={continuebutton} />
        </form>

    );
}}
//}

export default Zipcode;