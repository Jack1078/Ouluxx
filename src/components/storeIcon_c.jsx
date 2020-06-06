import React from "react";
import PropTypes from 'prop-types'

/**
 * Store Icons in the Store Selection page
 * @param {name, categories, onClick, img} StoreIcon
 */

const StoreIcon = (props) => {
    const {name, categories, img, onClick, ...other} = props;
    
    return (
        <button>

        </button>
    );
}

StoreIcon.propTypes = {
    name: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    img: PropTypes.element.isRequired,
}

export default StoreIcon;