import React from 'react';
import NavBar from '../../containers/navBar_k';
import classes from './cart_h.module.css';

const CartPage = (props) => {
    return (
        <div className={classes.container}>
            <NavBar />
        </div>
    );
}

export default CartPage;
