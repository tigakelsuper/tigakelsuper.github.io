import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { MyForm } from './components';
import { useAuth } from "../../auth/auth";
import decode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
import {moduleConfigs} from '../OrderInventory/OrderInventory';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  rootPaper: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 320
  },
}));

const OrderInventoryForm = props => {
  const {location,...rest} = props;

  const data = location.state;

  const classes = useStyles();
  const { authTokens } = useAuth();

  const jenisInput = data.jenis_input;

  const simpan = async (history,values) =>  {
 
    

    var re = /"(.*?)"/g;

var myArray = authTokens.match(re);
var token = myArray[0].replace(/\"/g,"");
const userInfo = decode(token);

  
    try {

      const  nomor = Date.parse(new Date())+'';

      const {inventory,user,...dataForApprove} = data.dataDefault;

      const dataForRequest =  {
        ...dataForApprove,
        status_order:values.status_persetujuan,
        catatan_persetujuan:values.catatan_persetujuan
      };
      console.log(values);
      console.log(dataForRequest);

      if(jenisInput==='approve'){
        const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${data.dataDefault.id_order}`,dataForRequest);
    
      }
     
      // console.log(' Returned data:', response);
     // handleOpen();
      history.push(`/${moduleConfigs.route}`);
    } catch (e) {
      alert("Terjadi kesalahan saat memproses permintaan Anda.");
      console.log(`Axios request failed: ${e}`);
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
     
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <MyForm simpan={simpan} data={data} />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderInventoryForm;
