import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput,RangedDateInput} from 'components';
import { withRouter } from 'react-router-dom';
import {moduleConfigs} from '../../../../Catering/Catering';
import { useAuth } from "../../../../../auth/auth";
import { isHCO } from 'hakakses/hakakses';
import {getUserInfoFromToken} from '../../../../../mymixin/mymixin';

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
  const { className,history,rangedDataInputOnClick, ...rest } = props;

  const { authTokens } = useAuth();

  


  const classes = useStyles();

  const MyButton = withRouter(({ history }) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { history.push(`/${moduleConfigs.route}/tambah`,{jenis_input:'tambah',dataDefault:{}}) }}
    >
     Pesan Catering
    </Button>
  ))

  const MyAddRuangaMeetingButton = withRouter(({ history }) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { history.push(`/ruang-meeting`) }}
    >
      Ruang Meeting
    </Button>
  ))

  const userInfo = getUserInfoFromToken(authTokens);
  const {id,name} = userInfo;
  const showMyAddButton = isHCO(name);

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
      <RangedDateInput
          myLabel="Filter Tanggal Catering"
          className={classes.searchInput}
          placeholder="Search Catering"
          onClick={rangedDataInputOnClick}
        />
        {/* <SearchInput
          className={classes.searchInput}
          placeholder="Search Pemesanan"
        /> */}
      </div>
    </div>
  );
};

MyToolbar.propTypes = {
  history:PropTypes.any,
  className: PropTypes.string
};

export default MyToolbar;
