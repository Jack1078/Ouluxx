import React, { useState, useEffect } from 'react';
import classes from './storePage_h.module.css';
import ProductsDisplay from '../../containers/productsDisplay_k';
import NavBar from '../../containers/navBar_k';
import Textfield from '../../components/textfield_c';
import { MdKeyboardArrowDown } from 'react-icons/md';

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

    const logoClickHandler = () => {
        console.log('logo clicked...')
    }
    const storeClickHandler = () => {
        console.log('store clicked...')
    }
    const accountClickHandler = () => {
        console.log('account clicked...')
    }
    const cartClickHandler = () => {
        console.log('cart clicked...')
    }

    useEffect(() => {
        setCurrPage(1);
    }, [currProducts]);

    return (
        <div>

            <NavBar
                logoOnClick={() => logoClickHandler()}
                storeOnClick={() => storeClickHandler()}
                accountOnClick={() => accountClickHandler()}
                cartOnClick={() => cartClickHandler()}
            />

            {/* ----------------------------- */}
            {/* -------- Store title -------- */}
            {/* ----------------------------- */}
            <div className={classes.store_container}>
                <img src={require(`../../images/stores/${storeImgUrl}`)} className={classes.store_img} />
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

            <div className={classes.search_bar}>
                <Textfield
                    id='product_search'
                    label={`Search ${storeName}...`}
                />
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
                <ProductsDisplay
                    products={currProducts}
                    currPage={currPage}
                    changePageHandler={changePageHandler}
                />
                <div>In Cart</div>
            </div>
        </div >
    );
};

export default StorePage;