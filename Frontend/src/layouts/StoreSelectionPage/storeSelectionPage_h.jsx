import React, { useState } from 'react';
import { Component } from 'react'
import StoreIcon from '../../components/storeIcon_c';
import classes from './storeSelectionPage_h.module.css';
import Filter from '../../containers/Filter/filter_k';
import Logo from '../../images/logo.png';
import NavBar from '../../containers/navBar_k';
import Footer from './../../containers/footer_k';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';



/**
 * Layout for the Store Selection page
 */

var testing;
var data = {
    zipcode: 11111
}

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
});

const stores = [{
    name: "fairway",
    categories: ["Groceries", "Produce", "Organic"],
    img_url: "fairway.png"
},
{
    name: "CVS Pharmacy@",
    categories: ["Personal Care", "Drugstore", "Groceries"],
    img_url: "cvs.png"
},
{
    name: "HMart",
    categories: ["Specialty", "Prepared Meals", "Ethnic"],
    img_url: "hmart.png"
},
{
    name: "Petco",
    categories: ["Pet Supplies"],
    img_url: "petco.png"
},
{
    name: "ABC",
    categories: ["Groceries", "Produce", "Organic"],
    img_url: "fairway.png"
},
{
    name: "DEF",
    categories: ["Personal Care", "Drugstore", "Groceries"],
    img_url: "cvs.png"
},];

const filters = ["All", "Drugstore", "Groceries", "Pet Supplies", "Meals"];

const filteredStores = (stores, filter) => {
    return stores.filter(store => filter === "All" ? true : store.categories.includes(filter))
        .map(filtered_store => (
            <StoreIcon
                key={filtered_store.name}
                name={filtered_store.name}
                categories={filtered_store.categories}
                img_url={filtered_store.img_url}
                alt={filtered_store.name + " icon"}
                onClick={() => console.log('Store Icon clicked')} />
        ))
}

const StoreSelect = () => {
    const [active, setActive] = useState('All');
    const [zipcode, setZipcode] = useState('11791');



    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [zip, setZip] = useState("")



    //return the fetch to return the promise
    const Get_User = (json_data) => {
        return fetch("/users/get_user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(json_data),
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((respData) => {
            console.log(JSON.parse(respData));

            return JSON.parse(respData);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };


    //create the promise, then work on the promise
    //all working on the response must occur in an async function like this. 
    var testing = Get_User();
    testing.then((response) => {
        console.log(response);
        testing = response;
        //console.log(testing)
        setZip(testing.Zipcode);
        setCountry(testing.name);
        setState(testing.State);
    })


    return (
        <>
            <div className={classes.background}>

                <div className={classes.logo_container}>
                    <img src={require(`../../images/logo1.png`)} width="125" ></img>
                </div>
                <div className={classes.zipcode_container}>
                    select store for delivery in&nbsp;<span style={{ fontWeight: 'bold' }}>{zipcode}</span>
                </div>
                <div className={classes.filter_container}>
                    <Filter
                        active={active}
                        onChange={active => setActive(active)}
                    >
                        {filters.map((filter) => {
                            return (
                                <div key={filter}>
                                    {filter}
                                </div>
                            );
                        })}
                    </Filter>
                </div>

                <div className={classes.recommend_container}>
                    Recommend Stores
              </div>
                <div className={classes.stores_container} style={{ borderBottom: "1px solid #e7e7e7" }}>
                    {/*   {filteredStores(stores, active)} */}
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={require(`../../images/logo1.png`)} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className={classes.recommend_container}>
                    Groceries
             </div>

                <div className={classes.stores_container}>
                    {/*   {filteredStores(stores, active)} */}
                    <div >
                        <img className={classes.cards} src={require(`../../images/logo1.png`)} alt="Alps" style={{ width: "100%" }}></img>
                        <div>
                            <h5 className={classes.cardtitle}>The Italian / Austrian Alps</h5>
                        </div>
                    </div>


                </div>



            </div>




            <Footer />

        </>
    );

}

export default StoreSelect;