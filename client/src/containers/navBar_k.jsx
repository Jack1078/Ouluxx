import React from 'react';
import PropTypes from 'prop-types';
import classes from './navBar_k.module.css';
import { MdStoreMallDirectory, MdAccountCircle } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

/**
 * Navigation bar
 * @param {} NavBar
 */

const NavBar = (props) => {

    const { ...other } = props

    return (
        <div className={classes.container} {...other}>
            <div className={classes.gradient_border}></div>
            <div className={classes.nav_bar}>
                <div className={classes.grid_5c}>
                    <Link to={'/'}>
                        <div className={classes.logo}>
                            OULU<span style={{ color: '#FFC70D' }}>X</span>X
                        </div>
                    </Link>

                    <Link to={'/stores'}>
                        <div className={[classes.btn, classes.store_btn].join(' ')}>
                            <div className={classes.btn_icon}><MdStoreMallDirectory /></div>
                            <div className={classes.btn_txt}>Stores</div>
                        </div>
                    </Link>


                    <div></div>
                    <Link to={'/'}>
                        <div className={classes.btn}>
                            <div className={classes.btn_icon}><MdAccountCircle /></div>
                            <div className={classes.btn_txt}>Account</div>
                        </div>
                    </Link>

                    <Link to={'/'}>
                        <div className={classes.btn}>
                            <div className={classes.btn_icon}><AiOutlineShoppingCart /></div>
                            <div className={classes.btn_txt}>Cart</div>
                        </div>
                    </Link>

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