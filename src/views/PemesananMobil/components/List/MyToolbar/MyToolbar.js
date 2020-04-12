import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const MyToolbar = props => {
  const { className,history, ...rest } = props;


  const classes = useStyles();

  const gotoForm = () => {
    history.push("/pemesanan-mobil/tambah");
  };

  const MyButton = withRouter(({ history }) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { history.push('/pemesanan-mobil/tambah') }}
    >
     Tambah Pemesanan
    </Button>
  ))

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
       
        <MyButton
        >
         
        </MyButton>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search Pemesanan"
        />
      </div>
    </div>
  );
};

MyToolbar.propTypes = {
  history:PropTypes.any,
  className: PropTypes.string
};

export default MyToolbar;
