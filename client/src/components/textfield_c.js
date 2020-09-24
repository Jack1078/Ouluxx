import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

/**
 * Textfield Customized with CSS
 * @param {id, label} CustomizedTextField
 */

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  input: {
    color: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.secondary.main
  }
}))

function CustomizedTextField(props) {
  const classes = useStyles()
  const { id, label, ...other } = props

  return (
    <div className={classes.root}>
      <TextField
        className={classes.margin}
        label={label}
        variant='outlined'
        id={id}
        fullWidth
        InputProps={{
          className: classes.input
        }}
        InputLabelProps={{
          className: classes.label
        }}
        {...other}
      />
    </div>
  )
}

CustomizedTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default CustomizedTextField
