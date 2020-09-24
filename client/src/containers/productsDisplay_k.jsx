import React from 'react';
import classes from './productsDisplay.module.css';
import PropTypes from 'prop-types';
import ProductIcon from '../components/productIcon_c';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

/**
 * The product carousel in the store page
 * @param {products, currPage, changePageHandler} ProductsDisplay
 */

const products_per_page = 15;

const ProductsDisplay = (props) => {
  const {products, currPage, changePageHandler} = props;
  const totalPages = parseInt(products.length / products_per_page) + 1;

  return (
    <div>
      <div style={{height: '720px'}}>
        <div className={classes.grid_container}>
          {products
              .slice(
                  (currPage - 1) * products_per_page,
                  currPage * products_per_page,
              )
              .map((product) => (
                <ProductIcon
                  name={product.name}
                  // img_url={product.img_url}        //commented out waiting for new database
                  alt={product.name}
                  categories={product.categories}
                  onClick={() => console.log('clicked product...' + product.name)}
                  rating={product.rating}
                  price={product.Price}
                  key={Math.random()}
                />
              ))}
        </div>
      </div>

      <div
        style={{fontFamily: 'Neusa Next Std'}}
        className={classes.page_change}
      >
        {currPage !== 1 && (
          <div onClick={() => changePageHandler(false)} className={classes.btn}>
            <MdKeyboardArrowLeft />
          </div>
        )}
        <div
          className={classes.page_text}
        >{`${currPage} of ${totalPages}`}</div>
        {currPage !== totalPages && (
          <div onClick={() => changePageHandler(true)} className={classes.btn}>
            <MdKeyboardArrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

ProductsDisplay.propTypes = {
  products: PropTypes.array.isRequired,
  currPage: PropTypes.number.isRequired,
  changePageHandler: PropTypes.func.isRequired,
};

export default ProductsDisplay;
