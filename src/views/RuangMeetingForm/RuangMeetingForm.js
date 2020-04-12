import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { MyForm } from './components';
import { useAuth } from "../../auth/auth";
import decode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
import {moduleConfigs} from '../RuangMeeting/RuangMeeting';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const RuangMeetingForm = props => {
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

       const fixValues = {
         ...values,
         kapasitas:parseInt(values.kapasitas)
       }

      if(jenisInput==='tambah'){
        const response = await axios.post(`${moduleConfigs.server}/${moduleConfigs.name}`,fixValues);
    
      }else{
       
        const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${values.id_ruangan}`,fixValues);
    
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

export default RuangMeetingForm;
