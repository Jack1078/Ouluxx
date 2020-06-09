import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";

/**
 * Filters the stores that appears in the store selection page
 * @param { active, onChange } Filter
 */

const useStyles = makeStyles(() => ({
    tabs: {
        position: 'relative',
        display: 'inline-block',
        backgroundColor: '#fff',
        width: '100%',
    },
    tab: {
        display: 'inline-block',
        padding: '12px 16px',
        borderRadius: '24px',
        backgroundColor: '#f7f7f7',
        cursor: 'pointer',
        margin: '5px 15px',
        transition: 'background-color .10s ease-in',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
    },
    filled_tab: {
        backgroundColor: '#fcec03',
        '&:hover': {
            backgroundColor: '#fcec03',
        }
    }
}));

const Filter = (props) => {
    const classes = useStyles();
    const {active, onChange, children, ...other} = props;
    
    return (
        <div
            className={classes.tabs}
            {...other}
        >
            Filter by
            {
                React.Children.map(children, (child, _) => {
                    let className = classes.tab;
                    if (child.key === active) {
                        className = [classes.tab,classes.filled_tab].join(' ');
                    }
                    return (
                        <div
                            className={className}
                            onClick={()=>{
                                onChange(child.key)
                            }}>
                            {child}
                        </div>
                    );
                })
            }
        </div>
    );
};

Filter.propTypes = {
    active: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Filter;