import React, { useState } from 'react';
import style from './zipcodeForm.module.css';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';

// rounded edges, yellow backgorund, slight padding
const continuebutton = {
    width: 275,
    borderRadius: 4,
    backgroundColor: "#FFF552",
    padding: 10,
    marginTop: 5,
    marginBottom: 0
};

const ZipcodeForm = (props) => {
    const [state, setState] = useState({
        zipcode: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    console.log("State: ", state);
    var userzipcode = 12345;
    return (

        <div>
            <h1 className={style.black}>Oulu<span className={style.yellow}>x</span>x</h1>
            <div className={style.zipbox}>
                <div >
                    <h3 className={style.fontA}>Delivery made classy.</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={style.row}>
                            <label className={style.input}>
                                <input type="text" name="zipcode" placeholder="Address or Zipcode"
                                    className={style.zipcodeform} onChange={handleChange} />
                            </label>
                        </div>
                        {/* <br /> */}
                        {/* <input type="button" value="Continue" className={style.continuebutton} /> */}
                        <div className={style.row}>
                            {/* <Button style={continuebutton} type="submit" >Continue</Button> */}
                            <Link
                                    className={style.continuebutton}
                                    to={{
                                        pathname: "/stores",
                                        state
                                    }}>
                                    Continue
                                </Link>
                        </div>
                    </form>

                    <p className={style.fontB}>Already have an account? <Link to="/signup" className={style.hyperlink}>Log In</Link> </p>

                </div>
            </div>
        </div>
    );
}


export default ZipcodeForm;