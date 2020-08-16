import React from "react";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

/**
 * Store Icons in the Store Selection page
 * @param {name, categories, onClick, img_url, alt} StoreIcon
 */

const useStyles = makeStyles(() => ({
    round_img: {
        width: '128px',
        height: '128px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.15)',
        borderRadius: '50%',
        margin: 'auto',
    },
    flex_vertical: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: '15px',
        color: '#393939',
        borderRadius: '4px',
    },
    clickable: {
        cursor: 'pointer',
        backgroundColor: '#fff',
        transition: 'background-color .15s ease-in',
        '&:hover': {
            backgroundColor: '#f7f7f7'
        }
    },
    margin_bottom: {
        marginBottom: '10px',
    },
    margin_top: {
        marginTop: '10px',
    },
    font_heavy: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    font_light: {
        color: '#969696'
    },
}));

const StoreIcon = (props) => {
    const classes = useStyles();
    const { name, categories, img_url, alt, onClick, ...other } = props;

    return (
        // Store Schema is missing categories and images on this branch, once filled the commented out should work
        <Link to={`/stores/${name}`}>
            <div className={[classes.flex_vertical, classes.clickable].join(' ')} onClick={() => onClick()} {...other}>
                {/* <img className={[classes.round_img, classes.margin_bottom, classes.margin_top].join(' ')} src={require( `../images/stores/${ img_url }` )} alt={alt}></img> */}
                {/* <span className={[classes.font_heavy, classes.margin_bottom].join(' ')}>{name}</span> */}
                {/* <span className={classes.font_light}>{categories.join(' · ')}</span> */}
            </div>
        </Link>
    );
}

StoreIcon.propTypes = {
    name: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    img_url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}

export default StoreIcon;