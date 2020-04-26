import React from 'react';
import classes from './StoresNearby.module.css'
import fairway_img from '../../assets/images/stores/fairway.png'
import cvs_img from '../../assets/images/stores/cvs.png'
import hmart_img from '../../assets/images/stores/hmart.png'
import petco_img from '../../assets/images/stores/petco.png'

function StoresNearbyContainer() {
    return (
        <div className={classes.stores_nearby}>
            <h3>Shop these great stores in NYC</h3>
            <img src={fairway_img} alt="fairway icon"/>
            <img src={cvs_img} alt="cvs icon"/>
            <img src={hmart_img} alt="hmart icon"/>
            <img src={petco_img} alt="petco icon"/>
        </div>
    );
}
  
export default StoresNearbyContainer;