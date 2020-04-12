import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button,TextField } from '@material-ui/core';

import { SearchInput,DateInput} from 'components';
import { withRouter } from 'react-router-dom';
import {moduleConfigs} from './../../../../ReservasiMeeting/ReservasiMeeting';

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
  const { className,history,searchRuangMeeting, ...rest } = props;


  const classes = useStyles();

  const MyButton = withRouter(({ history }) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { history.push(`/${moduleConfigs.route}/tambah`) }}
    >
     Tambah Reservasi
    </Button>
  ))

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
    
      </div>
      <div className={classes.row}>
      <div>1. Silahkan pilih ruang meeting</div>
    
      </div>
      <div className={classes.row}>
    
       <DateInput
          className={classes.searchInput}
          placeholder="Search Ruang Meeting"
          onChange={searchRuangMeeting}
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
