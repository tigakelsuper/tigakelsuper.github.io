import React , {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField ,Button} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { withRouter } from 'react-router-dom';

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

const TextInput = props => {
  const { className, onChange, style, placeHolderText, searchOnClick, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    filterData:''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const MyButton = withRouter(({ history }) => (
    <Button
            color="primary"
            variant="contained"
            onClick={()=>searchOnClick(values)}
          >
            Cari
          </Button>
  ))

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
   
    
      <TextField
                fullWidth
                placeholder={placeHolderText}
                label=""
                margin="dense"
                name="filterData"
                onChange={handleChange}
                required
                value={values.filterData}
                variant="outlined"
              />

            <MyButton />
    </Paper>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default TextInput;
