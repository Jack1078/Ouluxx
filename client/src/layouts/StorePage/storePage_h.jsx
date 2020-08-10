import React, { useState, useEffect } from 'react';
import classes from './storePage_h.module.css';
import ProductsDisplay from '../../containers/productsDisplay_k';
import MiniCart from '../../containers/miniCart_k';
import NavBar from '../../containers/navBar_k';
import Textfield from '../../components/textfield_c';
import VideoRoom from '../../containers/VideoRoom/videoroom_k';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import Draggable from 'react-draggable';

/**
 * Layout for the Store page
 */

var data = { "StoreID": "5f19dba9b8b917200936610d" }; //need a way to automate this

const products = [
    {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }, {
        name: "plant",
        categories: ["plant"],
        img_url: "plant.jpeg",
        rating: 3.2,
        price: 420.69,
    }, {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }, {
        name: "plant",
        categories: ["plant"],
        img_url: "plant.jpeg",
        rating: 3.2,
        price: 420.69,
    }, {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }, {
        name: "plant",
        categories: ["plant"],
        img_url: "plant.jpeg",
        rating: 3.2,
        price: 420.69,
    }, {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }, {
        name: "plant",
        categories: ["plant"],
        img_url: "plant.jpeg",
        rating: 3.2,
        price: 420.69,
    }, {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }, {
        name: "plant",
        categories: ["plant"],
        img_url: "plant.jpeg",
        rating: 3.2,
        price: 420.69,
    }, {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }, {
        name: "plant",
        categories: ["plant"],
        img_url: "plant.jpeg",
        rating: 3.2,
        price: 420.69,
    }, {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }, {
        name: "red T-shirt",
        categories: ["shirt", "t-shirt", "clothing"],
        img_url: "t-shirt.jpeg",
        rating: 4.5,
        price: 100.32,
    }, {
        name: "shirt",
        categories: ["shirt", "clothing"],
        img_url: "shirt.jpeg",
        rating: 5,
        price: 13.5,
    }];

//Items that are in the cart are contained here
// These items should be fetched from a users cart
const orders = [
    {
        num: 1,
        name: "red T-shirt",
        price: 100.32,
        img_url: "t-shirt.jpeg",
    },
    {
        num: 2,
        name: "red T-shirt",
        price: 100.32,
        img_url: "t-shirt.jpeg",
    },
    {
        num: 3,
        name: "red T-shirt",
        price: 100.32,
        img_url: "t-shirt.jpeg",
    },
    {
        num: 4,
        name: "red T-shirt",
        price: 100.32,
        img_url: "t-shirt.jpeg",
    },
    {
        num: 5,
        name: "red T-shirt",
        price: 100.32,
        img_url: "t-shirt.jpeg",
    },
    {
        num: 6,
        name: "red T-shirt",
        price: 100.32,
        img_url: "t-shirt.jpeg",
    }
];

const categories = ['All', 'shirt', 't-shirt', 'clothing', 'plant'];



const StorePage = (props) => {
    const storeName = props.match.params.store;
    const storeImgUrl = 'cvs.png';
    const storeRating = 4;
    const [currProducts, setCurrProducts] = useState([]);
    const [currPage, setCurrPage] = useState(1);

    // filter products based on categories
    const filterProductHandler = (category) => {
        setCurrProducts(products.filter(product =>
            category === "All" ? true : product.categories.includes(category)
        ));
    }

    // change displayed products
    const changePageHandler = (nextPage) => {
        if (nextPage)
            setCurrPage(currPage + 1);
        else
            setCurrPage(currPage - 1);
    }


    useEffect(() => {
        setCurrPage(1);
    }, [currProducts]);
    
    useEffect(() => {
        get_products(data);
    }, []);

    useEffect(() => {
        get_products(data);
    }, []);

    //Items here are products within a store
    //These items should be fetched from a store's inventory
    const get_products = (json_data) => {
        return fetch("/inventory/get_store_items", {
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
            // console.log("JSON.parse(respData) =", JSON.parse(respData));
            setCurrProducts(currProducts.splice(0, currProducts.length, ...temp));
            console.log("Data Recieved | Dat= ", currProducts);
            // return JSON.parse(respData);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };

    // const displayProducts = (items) => { /* items should be an array of products*/
    //     console.log("items: ", items);
    //     if (!items.length) return null;
    //     return items.map((item, index) => (
    //         <div key={index}>
    //             <h5>Name: {item.Name}</h5>
    //             <p>Price: {item.Price}</p>
    //         </div>
    //     ));
    // };


    return (
        <div>

            <NavBar />

            <Draggable>
                <div className={classes.videoroom_sticky}>
                    {props.match.params.roomID ? (
                        <VideoRoom />
                    ) : (
                            <Link className={classes.btn_link} to={`/stores/${props.match.params.store}/room/${uuid().replace('-', '')}`}>
                                <div className={classes.btn_join}>Create room</div>
                            </Link>
                        )
                    }
                </div>
            </Draggable>



            {/* ----------------------------- */}
            {/* -------- Store title -------- */}
            {/* ----------------------------- */}
            <div className={classes.store_container}>
                <img src={require(`../../images/stores/${storeImgUrl}`)} className={classes.store_img} alt={storeName} />
                <div className={classes.store_name}>{storeName}</div>
                <div className={classes.store_rating}>
                    {[...Array(storeRating)].map((_, i) => (
                        <span key={i}>&#9733;</span>
                    ))}
                    {[...Array(5 - storeRating)].map((_, i) => (
                        <span key={5 + i}>&#9734;</span>
                    ))}
                </div>
            </div>

            {/* ----------------------------- */}
            {/* -------- Function bar ------- */}
            {/* ----------------------------- */}
            <div className={classes.function_bar}>
                <div>Categories</div>

                <div className={classes.fn_btn}>Sort by<MdKeyboardArrowDown /></div>
                <div></div>
                <div>Delivery to <span className={classes.fn_btn}>11791</span></div>
            </div>

            {/* ----------------------------- */}
            {/* ------ product display ------ */}
            {/* ----------------------------- */}
            <div className={classes.grid_3c}>
                <div>
                    <ul className={classes.categories}>
                        {categories.map(category => (
                            <li
                                key={Math.random()}
                                onClick={() => filterProductHandler(category)}
                                className={classes.category}>
                                {category}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className={classes.search_bar}>
                        <Textfield
                            id='product_search'
                            label={`Search ${storeName}...`}
                        />
                    </div>
                    <ProductsDisplay
                        products={currProducts}
                        currPage={currPage}
                        changePageHandler={changePageHandler}
                    />
                </div>

                <div className={classes.grid_2r}>
                    <div></div>
                    <MiniCart
                        orders={orders}
                    />
                    <div></div>
                </div>
            </div>
        </div >
    );
};

export default StorePage;