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