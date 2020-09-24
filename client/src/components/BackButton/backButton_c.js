import React from 'react';
import PropTypes from 'prop-types';
import classes from './backButton_c.module.css';

/**
 * Go back to the previous page
 * @param {onClick} props
 */

function BackButton(props) {
  const {onClick} = props;

  return (
    <button type='button' className={classes.BackArrowButton} onClick={onClick}>
      <svg className={classes.BackArrowSVG} viewBox='0 0 24 24'>
        <path
          d='M6 11.983c-.01.27.089.543.291.745l9 8.979a.999.999
                    0 0 0 1.415-.002c.39-.39.384-1.03 0-1.413L8.41
                    12.016l8.3-8.306a1.008 1.008 0 0 0
                    .001-1.416.998.998 0 0 0-1.415 0L6.29
                    11.308c-.185.185-.282.429-.29.676z'
        ></path>
      </svg>
    </button>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func,
};

export default BackButton;
