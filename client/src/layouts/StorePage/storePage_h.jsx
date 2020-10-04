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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

/**
 * Layout for the Store page
 */

var data = { "StoreID": "5f19dba9b8b917200936610d" }; //need a way to automate this

const categories = ['All', 'shirt', 't-shirt', 'clothing', 'plant'];

const StorePage = (props) => {
    const storeName = props.match.params.store;
    const storeImgUrl = 'cvs.png';
    const storeRating = 4;
    const [products, setProducts] = useState([]);
    const [currProducts, setCurrProducts] = useState(products);
    const [currPage, setCurrPage] = useState(1);
    const [sort, setSort] = useState();

    // filter products based on categories
    const filterProductHandler = (category) => {
        setCurrProducts(products.filter(product =>
            category === "All" ? true : product.Category.includes(category)
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
        // window.location.reload();
    }, []);
    useEffect(() => {
        get_products(data);
        // window.location.reload();
    }, []);

    useEffect(() => {
        const sortArray = sortstyle => {
            const types = {
                ascending: 'Name',
                descending: 'Name',
                lowhigh: 'Price',
                highlow: 'Price'
            }
            const sortProperty = types[sortstyle];
            var sorted;
            if (sortstyle === 'lowhigh') {
                sorted = [...currProducts].sort((a, b) => a[sortProperty] - b[sortProperty]);
            } else if (sortstyle === 'highlow') {
                sorted = [...currProducts].sort((a, b) => b[sortProperty] - a[sortProperty]);
            } else if (sortstyle === 'ascending') {
                sorted = [...currProducts].sort(function(a, b)  {
                    var nameA = a.Name.toUpperCase();
                    var nameB = b.Name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else if (sortstyle === 'descending'){
                sorted = [...currProducts].sort(function (a, b) {
                    var nameA = a.Name.toUpperCase();
                    var nameB = b.Name.toUpperCase();
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                sorted = products;
            }
            console.log("Sort =", sort);
            console.log("sorted = ", sorted);
            setCurrProducts(sorted);
        }

        sortArray(sort);
        // setCurrProducts(products);
    }, [sort]);


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
            setProducts(products.splice(0, products.length, ...temp));
            console.log("Data Recieved | Products= ", products);
            console.log("Data Recieved | Current Products= ", currProducts);
            // return JSON.parse(respData);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };
    

    return (
        <div>
            <NavBar {...props} />
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

                <div className={classes.fn_btn}>
                    <FormControl variant="filled" className={classes.sortby}>
                        <InputLabel id="sortbybutton">Sort</InputLabel>
                        <Select
                            labelId="sortbybutton"
                            id="sortbyform"
                            // value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className={classes.sortby}
                            
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"descending"}>Descending</MenuItem>
                            <MenuItem value={"ascending"}>Ascending</MenuItem>
                            <MenuItem value={"lowhigh"}>Price: Low to High</MenuItem>
                            <MenuItem value={"highlow"}>Price: High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div />
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
                    // orders={orders}
                    />
                    <div></div>
                </div>
            </div>
        </div >

    );
};

export default StorePage;