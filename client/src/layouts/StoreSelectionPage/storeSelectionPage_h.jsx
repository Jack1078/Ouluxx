import React, { useState, useEffect } from 'react';
import { Component } from 'react'
import StoreIcon from '../../components/storeIcon_c';
import classes from './storeSelectionPage_h.module.css';
import Filter from '../../containers/Filter/filter_k';
import Logo from '../../images/logo.png';
import NavBar from '../../containers/navBar_k';
import Footer from './../../containers/footer_k';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';
import { Divider } from '@material-ui/core';
/**
 * Layout for the Store Selection page
 */


const filters = ["All", "Drugstore", "Groceries", "Pet Supplies", "Meals"];



const StoreSelect = (props) => {

    var temp = '';
    if (props.location && props.location.state && props.location.state.zipcode)
        temp = props.location.state.zipcode;
    const [active, setActive] = useState('All');
    const [zipcode, setZipcode] = useState(temp);
    const [currStores, setCurrStores] = useState([]);
    // const [currPage, setCurrPage] = useState(1);

    const data = { "Zipcode": zipcode }
    const user = {}

    useEffect(() => {
        if (temp === '') {
            // console.log("Temp is undefined");
            get_user();
        }
        get_stores(data);
    }, []);

    useEffect(() => {
        get_stores(data);
    }, []);

    const get_user = () => {
        return fetch("/users/get_logged_in", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(json_data)
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((respData) => {
            var temp = JSON.parse(respData);
            // console.log("JSON.parse(respData) =", JSON.parse(respData));
            setZipcode(temp.Zipcode)
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };


    const get_stores = (json_data) => {
        return fetch("/store/get_store_with_property", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json_data)
        }).then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((respData) => {
            var temp = JSON.parse(respData);
            console.log("JSON.parse(respData) =", JSON.parse(respData));
            setCurrStores(currStores.splice(0, currStores.length, ...temp));
            // console.log("Data Recieved | Stores= ", currStores);
            // return JSON.parse(respData);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };

    return (
        <>
            <div className={classes.background}>
                {/*****************************************Navbar and Info**************************************************/}

                <NavBar />
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
                {/*****************************************Recommended Stores**************************************************/}

                <div className={classes.recommend_container}>
                    Recommend Stores
              </div>
                <div className={classes.stores_container_custom} style={{
                    borderBottom: "1px solid #e7e7e7",
                    background: "linear-gradient(to left, rgb(240, 215, 0, 0.5), rgb(250, 137, 4, 0.5))",
                    width: "100%", height: "320px",
                    overflow: "visible"
                }}>
                    <div className={classes.stores_sub_container_custom}>
                        <img className={classes.cards} src={require(`../../images/Giant.jpg`)}
                            alt="Alps"
                            style={{ width: "100%", height: "180px", background: "white", }}></img>

                        <div>
                            <div className={classes.cardtitle} style={{ color: "white" }}><h5>Giant</h5> <h6 style={{ color: "grey" }}>4.0 miles</h6></div>
                        </div>
                    </div>


                    <div className={classes.stores_sub_container_custom}>
                        <img className={classes.cards} src={require(`../../images/Safeway.jpg`)}
                            alt="Alps"
                            style={{ width: "100%", height: "180px", background: "white", }}></img>
                        <div>
                            <div className={classes.cardtitle} style={{ color: "white" }}><h5>Safeway</h5> <h6 style={{ color: "grey" }}>2.0 miles</h6></div>
                        </div>

                    </div>


                    <div className={classes.stores_sub_container_custom}>
                        <img className={classes.cards} src={require(`../../images/Giant.jpg`)}
                            alt="Alps"
                            style={{ width: "100%", height: "180px", background: "white", }}></img>

                        <div>
                            <div className={classes.cardtitle} style={{ color: "white" }}><h5>Giant</h5> <h6 style={{ color: "grey" }}>4.0 miles</h6></div>
                        </div>
                    </div>


                    <div className={classes.stores_sub_container_custom}>
                        <img className={classes.cards} src={require(`../../images/Safeway.jpg`)}
                            alt="Alps"
                            style={{ width: "100%", height: "180px", background: "white", }}></img>
                        <div>
                            <div className={classes.cardtitle} style={{ color: "white" }}><h5>Safeway</h5> <h6 style={{ color: "grey" }}>2.0 miles</h6></div>
                        </div>
                    </div>

                </div>


                {/*****************************************Stores************************************************************/}
                <div className={classes.recommend_container}>
                    Groceries
             </div>

                <div className={classes.stores_container}>
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



            </div>



            {/*****************************************Footer************************************************************/}

            <Footer />

        </>
    );

}
export default StoreSelect;