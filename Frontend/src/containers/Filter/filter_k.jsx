import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";

/**
 * Filters the stores that appears in the store selection page
 * @param { active, onChange } Filter
 */

const useStyles = makeStyles(() => ({
    tabs: {
        display: 'block',
        backgroundColor: '#fff',
        width: 'auto',
        textAlign: 'left',
        borderTop: '1px solid #e2e2e2',
        borderBottom: '1px solid #e2e2e2',
        padding: '0 20px'
    },
    tab: {
        display: 'inline-block',
        padding: '12px 16px',
        borderRadius: '24px',
        backgroundColor: '#f7f7f7',
        cursor: 'pointer',
        margin: '5px 5px',
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
    },
    margin_right: {
        marginRight: '15px',
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
            <span className={classes.margin_right}>Filter by</span>
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