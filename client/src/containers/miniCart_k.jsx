import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './miniCart_k.module.css';

/**
 * In cart section
 * @param {orders} MiniCart
 */

const MiniCart = (props) => {
    const data = { "userid": "5f2d7b4357d7468130a840f2" };  //need a way to automate this
    const [cart, setCart] = useState([]);
    // const { orders } = props;
    var { orders } = [];

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
            };
            return response.json();
        }).then((respData) => {
            // console.log("temp = ", temp[0].Cart);
            // console.log("JSON.parse(respData) =", JSON.parse(respData));
            var temp = JSON.parse(respData);
            setCart(cart.splice(0, cart.length, ...temp[0].Cart));
            // console.log("Data Recieved | Cart= ", cart);
        }).catch((err) => {
            console.log(err);
            return (err);
        });
    };

    /* items should be an array of products*/
    // const displayCart = (items) => { 
    //     console.log("Cart display: ", items);
    //     if (!items.length) return null;
    //     return items.map((item, index) => (
    //         <div key={index}>
    //             <h5>Name: {item.ItemName}</h5>
    //             <p>Price: {item.Price}</p>
    //         </div>
    //     ));
    // };

    useEffect(() => {
        get_cart(data);
    }, []);

    useEffect(() => {
        get_cart(data);
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.title}>IN CART</div>
            <ul className={classes.list}>
                {/* {displayCart(cart)} */}
                {cart.map(order => (
                    <li key={order.num}>
                        <div className={classes.inner}>
                            {/* <img src={require(`../images/${order.img_url}`)} alt={order.name}></img> */} {/**commented out until new backend implemented */}
                            <div className={classes.info}>
                                <div className={classes.order_num}>Order: #{order.Quantity}</div>
                                <div className={classes.order_name}>{order.ItemName}</div>
                                <div className={classes.order_price}>${order.Price}</div>
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