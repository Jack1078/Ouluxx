import React from "react";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

/**
 * Button with customized css
 * @param {id, text, color, fontColor} CustomizedButton
 */

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
}));

function CustomizedButton(props) {
    const classes = useStyles()
    const {id, text, color, fontColor, ...other} = props

    return (
        <div className={classes.root}>
            <Button
                id={id}
                color={color}
                variant="contained"
                disableElevation
                disableFocusRipple
                fullWidth
                style={{minHeight: "40px", maxHeight: "46px"}}
                {...other}>
            <span style={{color: fontColor, fontSize: "16px"}}>{text}</span>
            </Button>
        </div>
    )
}

CustomizedButton.prototype = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fontColor: PropTypes.string.isRequired,
}

export default CustomizedButton