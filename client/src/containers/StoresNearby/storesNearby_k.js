import React, { useState } from 'react';
import classes from './storesNearby_k.module.css'
import fairway_img from '../../images/stores/fairway.png'
import cvs_img from '../../images/stores/cvs.png'
import hmart_img from '../../images/stores/hmart.png'
import petco_img from '../../images/stores/petco.png'
import StoreIcon from '../../components/storeIcon_c';


/**
 * Display stores near region (by zipcode)
 */


function StoresNearbyContainer() {

    var testing;

    var data = {
        stores: [{
            storeName: "Fairway",
            img: {
                src: fairway_img,
                alt: "Fairway logo",

            },
            zipcode: "20852"
        },
        {
            storeName: "CVS",
            img: {
                src: cvs_img,
                alt: "CVS logo",
            },
            zipcode: "20852"
        },
        {
            storeName: "Petco",
            img: {
                src: petco_img,
                alt: "petco logo",

            },
            zipcode: "20852"
        },
        {
            storeName: "hmart",
            img: {
                src: hmart_img,
                alt: "hmart logo",

            },
            zipcode: "20852"
        },
        ]
    }

    const [zip, setZip] = useState("")
    const [storeName, setStoreName] = useState("")
    const [img, setImg] = useState("")
    const [alt, setAlt] = useState("")
    const [receivedData, setReceivedData] = useState([{
        storeName: "Petco",
        img: {
            src: petco_img,
            alt: "petco logo",
        },
        zipcode: "20852"
    }])


    //return the fetch to return the promise
    const Get_Stores = (json_data) => {
        return fetch("/users/test", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json_data)
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((respData) => {
            return JSON.parse(respData);
            //console.log(testing);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    }

    //create the promise, then work on the promise
    //all working on the response must occur in an async function like this. 
    testing = Get_Stores(data);
    testing.then((response) => {
        console.log(response);
        testing = response;
        setReceivedData(testing)

    });
    const displayStores = (x) => {
        return x.stores.map(store => (
            <img src={store.img.src} alt={store.img.alt}></img>
        ))
    }


    return (
        <div className={classes.stores_nearby}>
            <h3>Shop these great retail stores near you!</h3>
            {displayStores(data)}
        </div>
    );
}

export default StoresNearbyContainer;