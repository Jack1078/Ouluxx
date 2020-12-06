import React from 'react';
//import Button from '../../components/button_c';
import classes from './error_k.module.css';
import browse_img from '../../images/brands.png';
import shop_img from '../../images/videochat.png';
import bag_img from '../../images/bag.png';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


/**
 * Ouluxx service description container
 */

function Error() {
    return (
        <div className={classes.parentcontainer}>
            <div className={classes.container}>
                <h1>Signed Out!</h1>
                <h2>Please log in again</h2>
                <br></br>
                <Link to="/login">
                    <a href=".">
                        <Button
                            variant="dark"

                        >login</Button>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Error;