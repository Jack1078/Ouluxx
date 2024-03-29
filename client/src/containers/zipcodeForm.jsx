import React, { useState } from 'react';
import style from './zipcodeForm.module.css';
import { Link, withRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
    TextField,
    Button,
} from '@material-ui/core';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FFE165"
        },
    }
})

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
        // console.log("Props: ", props);
        event.preventDefault();
        props.history.push({
            pathname: '/signup',
            state
        });
    };

    // console.log("State: ", state);
    return (
        <ThemeProvider>
            <div className={style.container}>
                <div className={style.smallcontainer}>
                    <div className={style.formbox}>
                        <div className={style.header}>
                            <h3><strong>OULUXX</strong></h3>
                        </div>
                        <div className={style.slogan}>
                            Deilvery made classy since 2020
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    id="input_zipcode"
                                    name="zipcode"
                                    type="text"
                                    label="Zipcode"
                                    placeholder="Enter your 5-digit zipcode here..."
                                    className={style.textfield}
                                    color="primary"
                                    variant="outlined"
                                    inputProps={{ pattern: "^[0-9]{5}" }}
                                    helperText={state.zipcode === "" ? "" : "Please enter your 5-digit zipcode"}
                                    error={state.zipcode.length > 5 || (/[^0-9]/g).test(state.zipcode)}
                                    value={state.zipcode}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required />
                            </div>
                            <div>
                                <input type="submit" className={style.button} value="Continue" />
                            </div>
                        </form>
                        <div className={style.login}>
                            Already have an account?&nbsp;
                            <Link
                                className={style.link}
                                to="/login"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </ThemeProvider>
    );
}


export default withRouter(ZipcodeForm);