import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import NavBar from '../../containers/navBar_k';
import Footer from '../../containers/footer_k';
import classes from './cart_h.module.css';

const CartPage = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // TODO: fetch items placed in user's cart
        setItems([
            {
                ItemID: '1',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            },
            {
                ItemID: '2',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            },
            {
                ItemID: '3',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            },
            {
                ItemID: '4',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            },
            {
                ItemID: '5',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            },
            {
                ItemID: '6',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            },
            {
                ItemID: '7',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            },
            {
                ItemID: '8',
                ItemName: 'item 1',
                Quantity: 1,
                Price: 13.5,
                Subtotal: 13.5,
            }
        ]);
    }, []);

    return (
        <div className={classes.container}>
            <NavBar />
            <div className={classes.container_btn}>
                <div className={classes.btn_back}><IoIosArrowBack />Back to Shopping</div>
            </div>
            <div className={classes.container_upper}>
                <div className={classes.title}>
                    <AiOutlineShoppingCart />
                    <div>&nbsp;My Cart</div>
                </div>
                <div className={classes.row_btn}>
                    <div className={classes.btn_receipts}>RECEIPTS</div>
                    <div className={classes.btn_coupons}>COUPONS</div>
                </div>
            </div>
            <div className={classes.container_body}>
                <div className={classes.cart}>
                    {items.map(item => (
                        <div key={item.ItemID} className={classes.item}>
                            <div>
                                {item.ItemName}
                                <span>Quantity: {item.Quantity}</span>
                            </div>
                            <div>
                                <FiTrash color="#a70000" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={classes.container_order}>
                    <div className={classes.row}>
                        <div className={classes.left_grid}>Items(5):</div>
                        <div>$100.0</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.left_grid}>Shipping &amp; Handling:</div>
                        <div>$100.0</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.left_grid}>Total Before Tax:</div>
                        <div>$100.0</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.left_grid}>Estimated Tax:</div>
                        <div>$100.0</div>
                    </div>
                    <hr className={classes.line} />
                    <div className={classes.row_total}>
                        <div className={classes.left_grid}>Order Total:</div>
                        <div>$100.0</div>
                    </div>
                    <div className={classes.container_btns}>
                        <div className={classes.btn_grey}>Delivery Address</div>
                        <div className={classes.btn_grey}>Payment Info</div>
                        <div className={classes.btn_checkout}>Check out <IoIosArrowForward className={classes.arrow_right} /></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CartPage;
