import React from 'react'

function Zipcode() {
    return (
        <form>
            <label>
                <input type="text" name="name" placeholder="Address or Zipcode"
                    style={{
                        // borderColorTop: "grey",
                        borderBottomColor: "grey",
                        borderRightColor: "grey",
                        // borderLeftColor: "grey",
                        width: 250, borderRadius: 2,

                        // backgroundColor: "#282C33",
                        color: "white",
                        padding: 10,
                    }} />
            </label>
            <br />
            <input type="submit" value="Continue"
                style={{
                    width: 275, borderRadius: 3,
                    backgroundColor: "#FFF552",
                    padding: 10
                }} />
        </form>

    );
}

export default Zipcode;