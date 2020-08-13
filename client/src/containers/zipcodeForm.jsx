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
        console.log("Props: ", props)
        event.preventDefault();
        props.history.push({
            pathname: '/stores',
            state
        });
    };

    console.log("State: ", state);
    return (
        <ThemeProvider>
            <div className={style.container}>
                <div className={style.smallcontainer}>
                    <div className={style.formbox}>
                        <div className={style.header}>
                            Oulu<span style={{ color:"#FBDE49", fontFamily:"Verdana"}}>x</span>x
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
                            to="/signup"
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