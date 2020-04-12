import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField,Button } from '@material-ui/core';
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

const RangedDateInput = props => {
  const { className, onClick, style,myLabel, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    startDate:null,
    endDate:null,
   
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      <div>{myLabel} </div>
      <CalendarTodayIcon className={classes.icon} />
      <TextField
  
    label=""
    name="startDate"
    type="date"
    onChange = {handleChange}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}

  />
   <div> ke </div>
      <CalendarTodayIcon className={classes.icon} />
      <TextField
    name="endDate"
    label=""
    type="date"
     onChange = {handleChange}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    
  />
  <Button
       color="primary"
          variant="contained"
      onClick={()=>onClick(values)}
    >
      Search
    </Button>
    </Paper>
  );
};

RangedDateInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default RangedDateInput;
