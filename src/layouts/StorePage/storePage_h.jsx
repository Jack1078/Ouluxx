import React, { useState, useEffect } from 'react';
import classes from './storePage_h.module.css';
import ProductsDisplay from '../../containers/productsDisplay_k';
import NavBar from '../../containers/navBar_k';

/**
 * Layout for the Store page
 */

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

const categories = ['shirt', 't-shirt', 'clothing', 'plant'];

const StorePage = () => {
    const storeName = 'CornHub';
    const storeImgUrl = 'cvs.png';
    const storeRating = 4;
    const [currProducts, setCurrProducts] = useState(products);
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

    return (
        <div>

            <NavBar />

            {/* ----------------------------- */}
            {/* -------- Store title -------- */}
            {/* ----------------------------- */}
            <div className={classes.store_container}>
                <img src={require(`../../images/stores/${storeImgUrl}`)} className={classes.store_img} />
                <div className={classes.store_name}>{storeName}</div>
                <div className={classes.store_rating}>
                    {[...Array(storeRating)].map((_, i) => (
                        <span>&#9733;</span>
                    ))}
                    {[...Array(5 - storeRating)].map((_, i) => (
                        <span>&#9734;</span>
                    ))}
                </div>
            </div>


            {/* TODO: add bar */}

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
                <ProductsDisplay
                    products={currProducts}
                    currPage={currPage}
                    changePageHandler={changePageHandler}
                />
                <div>In Cart</div>
            </div>
        </div>
    );
};

export default StorePage;