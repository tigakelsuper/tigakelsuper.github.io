import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { MyForm } from './components';
import { useAuth } from "./../../auth/auth";
import decode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
import {moduleConfigs} from './../ReservasiMeeting/ReservasiMeeting';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const ReservasiMeetingForm = props => {
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

      const dataForRequest =  {
        waktu_meeting: moment(values.waktu_meeting,'YYYY-MM-DD').add(1, 'days').format(),
        start_meeting: moment(values.startMeeting,'YYYY-MM-DD').add(1, 'days').format(),
        end_meeting: moment(values.endMeeting,'YYYY-MM-DD').add(1, 'days').format(),
        agenda: values.agenda,
        deskripsi:values.deskripsi,
        status:moduleConfigs.statusList.available,
        userId:parseInt(userInfo.id),
        ruangMeetingId:values.id_ruangan
      };

      if(jenisInput==='tambah'){
        const response = await axios.post(`${moduleConfigs.server}/${moduleConfigs.name}`,dataForRequest);
    
      }else{
        const dataForUpdate = {
          ...dataForRequest,
          id_meeting_room_res:values.id_meeting_room_res
        }
        const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${values.id_meeting_room_res}`,dataForRequest);
    
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

export default ReservasiMeetingForm;
