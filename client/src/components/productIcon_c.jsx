import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";

/**
 * Product Icons in the Store page
 * @param {name, categories, onClick, img_url, alt, rating, price} ProductIcon
 */

const useStyles = makeStyles(() => ({
    container: {
        width: '140px',
        height: '198px',
        cursor: 'pointer',
        padding: '20px',
        backgroundColor: '#fff',
        fontFamily: 'Neusa Next Std',
    },
    img: {
        height: '133px',
    },
    name: {
        display: 'block',
        color: '#515C6F',
        fontSize: '15px',
        marginTop: '13px',
        fontWeight: 'lighter',
    },
    price: {
        display: 'inline-block',
        float: 'left',
        marginTop: '10px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    rating_container: {
        display: 'inline-block',
        float: 'right',
        marginTop: '10px',
        backgroundColor: '#FF6969',
        width: '33px',
        height: '16px',
        borderRadius: '10px',
        verticalAlign: 'middle',
        lineHeight: '12px',
    },
    rating_text: {
        fontSize: '9px',
        color: '#fff',
        fontWeight: 'bold',
    }
}));

const ProductIcon = (props) => {
    const classes = useStyles();
    const { name, categories, img_url, alt, onClick, rating, price, ...other } = props;

    return (
        <div
            className={classes.container}
            onClick={() => onClick()}
            {...other}>
            {/* <img className={classes.img} src={require(`../images/${img_url}`)} alt={alt}></img> */}  {/* commented out until new database is implemented*/}
            <span className={classes.name}>{name}</span>
            <span className={classes.price}>${price.toFixed(2)}</span>
            <div className={classes.rating_container}>
                <span className={classes.rating_text}>&#9733;{rating}</span>
            </div>

        </div>
    );
}

ProductIcon.propTypes = {
    name: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    img_url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
}

export default ProductIcon;