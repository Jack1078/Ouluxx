import React from 'react';
import Button from '../../components/button_c';
import classes from './about_k.module.css';
import browse_img from '../../images/browse.png';
import shop_img from '../../images/shopping.png';
import bag_img from '../../images/bag.png';
import {Link} from 'react-router-dom';

/**
 * Ouluxx service description container
 */

function Description() {
  return (
    <div className={classes.padding_vertical}>
      {/* Short description */}
      <div
        className={[
          classes.grid,
          classes.three_per_row,
          classes.padding_top,
        ].join(' ')}
      >
        <img src={browse_img} alt='touching app' />
        <img src={shop_img} alt='shopping car' />
        <img src={bag_img} alt='a bag' />
        <h3>Brands you love</h3>
        <h3>Support small businesses</h3>
        <h3>Save time and money</h3>
        <div className={classes.text}>
          Browse and find our next favorite product from stores you already shop
          from and stores you have yet to find,
        </div>
        <div className={classes.text}>
          Due to Covid-19 small businesses need your help to stay in businesses.
          You can support your local stores right here!
        </div>
        <div className={classes.text}>
          Find deals on popular products and brands
          <br />
        </div>
      </div>

      {/* Description with buttons */}
      <div className={[classes.grid, classes.two_per_row].join(' ')}>
        <div
          className={[classes.box, classes.img, classes.deliveryGuy_img].join(
              ' ',
          )}
        ></div>
        <div className={classes.box}>
          {' '}
          {/* //! */}
          <h3>Local brands in the palm of your hand </h3>
          <div className={classes.text}>
            All the brands you love together in one marketplace
          </div>
          <div className={[classes.margin_top, classes.margin_left].join(' ')}>
            <Button
              className={classes.button}
              id='saving_button'
              text='Start saving'
              color='primary'
              fontColor='white'
              component={Link}
              to='/signup'
            />
          </div>
        </div>

        <div className={classes.box}>
          <h3>Browse products</h3>
          <div className={classes.text}>
            Find everything that you usually buy and get suggestions that are
            curated just for you too.
          </div>
          <div className={[classes.margin_top, classes.margin_left].join(' ')}>
            <Button
              className={classes.button}
              id='started_button'
              text='Get started'
              color='primary'
              fontColor='white'
              component={Link}
              to='/signup'
            />
          </div>
        </div>
        <div
          className={[classes.box, classes.img, classes.browse_img].join(' ')}
        ></div>
      </div>

      {/* Popularity on media */}
      <div
        className={[
          classes.row,
          classes.padding_top,
          classes.padding_bottom,
        ].join(' ')}
      >
        <div
          className={[classes.margin_auto, classes.button_delivery].join(' ')}
        >
          <Button
            id='delivery_button'
            text='Sign up now'
            color='primary'
            fontColor='white'
            component={Link}
            to='/signup'
          />
        </div>
      </div>
    </div>
  );
}

export default Description;
