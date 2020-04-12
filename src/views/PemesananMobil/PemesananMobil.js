import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PemesananMobil = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <MyToolbar />
      <div className={classes.content}>
        <MyTable users={users} />
      </div>
    </div>
  );
};

export default PemesananMobil;
