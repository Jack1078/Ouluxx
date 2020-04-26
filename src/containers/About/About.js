import React from 'react';
import Button from '../../components/Button'
import classes from './About.module.css';
import touch_img from '../../assets/images/touch_app.jpg';
import shop_img from '../../assets/images/shop_car.jpg';
import bag_img from '../../assets/images/bag.jpg';

function AboutContainer() {
    return(
        <div>
            <div className={[classes.grid, classes.three_per_row].join(' ')}>
                <img src={touch_img} alt="touch" className={classes.grid_item}/>
                <img src={shop_img} alt="shop" className={classes.grid_item}/>
                <img src={bag_img} alt="bag" className={classes.grid_item}/>
                <h3 className={classes.grid_item}>Products you love</h3>
                <h3 className={classes.grid_item}>Same-day delivery</h3>
                <h3 className={classes.grid_item}>Save time & money</h3>
                <span className={classes.grid_item}>
                    Find 1,000's of products<br/>
                    from the stores you already shop at
                </span>
                <span className={classes.grid_item}>
                    We make deliveries in cities like Los Angeles,<br/>
                    Miami, New York City, Chicago, Austin,<br/>
                    Washington D.C, Houston, Atlanta and many <br/>
                    more
                </span>
                <span className={classes.grid_item}>
                    Find exclusive deals on popular<br/>
                    products<br/>
                    &mdash; delivered to your front door!
                </span>
            </div>
            <div className={[classes.grid, classes.two_per_row].join(' ')}>
                
                <div className={[classes.grid_item, classes.box, classes.img].join(' ')}></div>
                <div className={[classes.grid_item, classes.box].join(' ')}>
                    <div>
                        <h3>Deals that delight</h3>
                        <span>Saving money on Ouluxx is easy. Find exclusive coupons on hundreds of items</span>
                        <div className={classes.button_box}>
                            <Button
                                id="saving_button"
                                text="Start saving"
                                color="primary"
                                fontColor="white"/>
                        </div>
                    </div>
                </div>

                <div className={[classes.grid_item, classes.box].join(' ')}>
                    <div>
                        <h3>Browse products</h3>
                        <span>Find everything you usually buy and get suggestions on amazing new items too.</span>
                        <div className={classes.button_box}>
                            <Button
                                id="started_button"
                                text="Get started"
                                color="primary"
                                fontColor="white"/>
                        </div>
                    </div>
                </div>
                <div className={[classes.grid_item, classes.box, classes.img].join(' ')}></div>

                <div className={[classes.grid_item, classes.box, classes.img].join(' ')}></div>
                <div className={[classes.grid_item, classes.box].join(' ')}>
                    <div>
                        <h3>Fresh produce picked perfectly</h3>
                        <span>We know how to pick the freshest produce with the perfect ripeness. And we'll keep your eggs safe too.</span>
                        <div className={classes.button_box}>
                            <Button
                                id="started_button"
                                text="Get started"
                                color="primary"
                                fontColor="white"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.flex_column}>
                <span>AS SEEN ON</span>
                <div className={classes.icons}></div>
                <h3>Get Delivery in NYC</h3>
            </div>
            <div className={classes.button_delivery_row}>
                <div className={classes.button_delivery_box}>
                    <Button
                        id="delivery_button"
                        text="Get Delivery now"
                        color="primary"
                        fontColor="white"/>
                </div>
            </div>
            
        </div>
    );
}

export default AboutContainer