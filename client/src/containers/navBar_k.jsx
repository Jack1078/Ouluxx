import React from 'react';
import PropTypes from 'prop-types';
import classes from './navBar_k.module.css';
import { MdStoreMallDirectory, MdAccountCircle } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai';

/**
 * Navigation bar
 * @param {logoOnClick, storeOnClick, accountOnClick, cartOnClick} NavBar
 */

const NavBar = (props) => {

    const { logoOnClick, storeOnClick, accountOnClick, cartOnClick, ...other } = props

    return (
        <div className={classes.container} {...other}>
            <div className={classes.gradient_border}></div>
            <div className={classes.nav_bar}>
                <div className={classes.grid_5c}>

                    <div
                        className={classes.logo}
                        onClick={() => logoOnClick()}>
                        OULU<span style={{ color: '#FFC70D' }}>X</span>X</div>

                    <div
                        className={[classes.btn, classes.store_btn].join(' ')}
                        onClick={() => storeOnClick()}>
                        <div className={classes.btn_icon}><MdStoreMallDirectory /></div>
                        <div className={classes.btn_txt}>Stores</div>
                    </div>

                    <div></div>
                    <div
                        className={classes.btn}
                        onClick={() => accountOnClick()}>
                        <div className={classes.btn_icon}><MdAccountCircle /></div>
                        <div className={classes.btn_txt}>Account</div>
                    </div>

                    <div
                        className={classes.btn}
                        onClick={() => cartOnClick()}>
                        <div className={classes.btn_icon}><AiOutlineShoppingCart /></div>
                        <div className={classes.btn_txt}>Cart</div>
                    </div>
                    <div></div>

                </div>
            </div>
        </div>

    );
}

NavBar.propTypes = {
    logoOnClick: PropTypes.func.isRequired,
    storeOnClick: PropTypes.func.isRequired,
    accountOnClick: PropTypes.func.isRequired,
    cartOnClick: PropTypes.func.isRequired,
}

export default NavBar;