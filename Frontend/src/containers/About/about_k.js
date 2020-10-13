import React from 'react';
import Button from '../../components/button_c';
import classes from './about_k.module.css';
import browse_img from '../../images/browse.png';
import shop_img from '../../images/shopping.png';
import bag_img from '../../images/bag.png';

/**
 * Ouluxx service description container
 */

function Description() {
    return (
        <div className={classes.padding_vertical}>

            {/* Short description */}

            <div className={[classes.grid, classes.three_per_row, classes.padding_top].join(' ')}>
                <img src={browse_img} alt="touching app" />
                <img src={shop_img} alt="shopping car" />
                <img src={bag_img} alt="a bag" />
                <h3>Brands you love</h3>
                <h3>Shop with friends & family</h3>
                <h3>Save time and money</h3>
                <div className={classes.text}>
                    Browse and find our next favorite product from stores you already shop from
                    our mobile app and website
                </div>
                <div className={classes.text}>
                    We make deliveries to cities like Washington, DC,
                    Silver Spring, College Park and many more.
                </div>
                <div className={classes.text}>
                    Find deals on popular products and brands<br />
                    &mdash; delivered right to your door
                </div>
            </div>

            {/* Description with buttons 
            <div className={[classes.grid, classes.two_per_row].join(' ')}>

                <div className={[classes.box, classes.img, classes.deliveryGuy_img].join(' ')}></div>
                <div className={classes.box}>
                    <h3>The Best Brands Instantly Delivered to You </h3>
                    <div className={classes.text}>The Brand you love, we bring to you when you need them the most.</div>
                    <div className={[classes.margin_top, classes.margin_left].join(' ')}>
                        <Button
                            className={classes.button}
                            id="saving_button"
                            text="Start saving"
                            color="primary"
                            fontColor="white" />
                    </div>
                </div>

                <div className={classes.box}>
                    <h3>Browse products</h3>
                    <div className={classes.text}>Find everything that you usually buy and get suggestions that are curated just for you too.</div>
                    <div className={[classes.margin_top, classes.margin_left].join(' ')}>
                        <Button
                            className={classes.button}
                            id="started_button"
                            text="Get started"
                            color="primary"
                            fontColor="white" />
                    </div>
                </div>
                <div className={[classes.box, classes.img, classes.browse_img].join(' ')}></div>
            </div>*/}

            {/* Popularity on media */}
            <div className={[classes.row, classes.padding_top, classes.padding_bottom].join(' ')}>
                <div className={[classes.margin_auto, classes.button_delivery].join(' ')}>
                    <a href="#" style={{ textDecoration: "none" }}> <Button
                        id="delivery_button"
                        text="Start Shopping!"
                        color="primary"
                        fontColor="white" />
                    </a>
                </div>

            </div>

        </div>
    );
}

export default Description