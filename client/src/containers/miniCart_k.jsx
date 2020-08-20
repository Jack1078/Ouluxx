import React from 'react';
import PropTypes from 'prop-types';
import classes from './miniCart_k.module.css';

/**
 * In cart section
 * @param {orders} props
 */

const MiniCart = (props) => {
    const { orders } = props;

    const checkoutHandler = () => {
        console.log('checkout clicked ...')
    };

    return (
        <div className={classes.container}>
            <div className={classes.title}>IN CART</div>
            <ul className={classes.list}>
                {orders.map(order => (
                    <li key={order.num}>
                        <div className={classes.inner}>
                            <img src={require(`../images/${order.img_url}`)} alt={order.name}></img>
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