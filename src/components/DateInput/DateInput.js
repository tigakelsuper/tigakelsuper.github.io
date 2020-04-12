import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 320
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  }
}));

const DateInput = props => {
  const { className, onChange, style, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <div>Pilih Tanggal Meeting</div>
      <CalendarTodayIcon className={classes.icon} />
      <TextField
    id="date"
    label=""
    type="date"
    onChange = {event=> onChange(event.target.value)}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </Paper>
  );
};

DateInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default DateInput;
