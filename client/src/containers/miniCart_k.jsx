import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './miniCart_k.module.css';

/**
 * In cart section
 * @param {orders} MiniCart
 */

const MiniCart = (props) => {
    const { orders } = props;
    const [dat, setDat] = useState([]);

    const checkoutHandler = () => {
        console.log('checkout clicked ...')
    };

    const get_cart = (json_data) => {
        return fetch("/users/get_cart", {
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
            setDat(dat.splice(0, dat.length, ...temp));
            console.log("Data Recieved | Dat= ", dat);
            // return JSON.parse(respData);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };

    const displayCart = (items) => { /* items should be an array of products*/
        console.log("items: ", items);
        if (!items.length) return null;
        return items.map((item, index) => (
            <div key={index}>
                <h5>Name: {item.Name}</h5>
                <p>Price: {item.Price}</p>
            </div>
        ));
    };

    return (
        <div className={classes.container}>
            <div className={classes.title}>IN CART</div>
            <ul className={classes.list}>
                {orders.map(order => (
                    <li key={order.num}>
                        <div className={classes.inner}>
                            {/* <img src={require(`../images/${order.img_url}`)} alt={order.name}></img> */}
                            <div className={classes.info}>
                                <div className={classes.order_num}>Order: #{order.num}</div>
                                <div className={classes.order_name}>{order.name}</div>
                                <div className={classes.order_price}>${order.price}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={classes.btn} onClick={() => checkoutHandler()}>
                CHECK OUT
            </div>
        </div>
    );
}

MiniCart.propTypes = {
    orders: PropTypes.array.isRequired
}

export default MiniCart;