import React from 'react';
import classes from './storesNearby_k.module.css'
import fairway_img from '../../assets/images/stores/fairway.png'
import cvs_img from '../../assets/images/stores/cvs.png'
import hmart_img from '../../assets/images/stores/hmart.png'
import petco_img from '../../assets/images/stores/petco.png'

/**
 * Display stores near region (by zipcode)
 */

function StoresNearbyContainer() {
    return (
        <div className={classes.stores_nearby}>
            <h3>Shop these great stores in NYC</h3>
            <img src={fairway_img} alt="Fairway logo"/>
            <img src={cvs_img} alt="CVS logo"/>
            <img src={hmart_img} alt="HMart logo"/>
            <img src={petco_img} alt="Petco logo"/>
        </div>
    );
}

export default StoresNearbyContainer;