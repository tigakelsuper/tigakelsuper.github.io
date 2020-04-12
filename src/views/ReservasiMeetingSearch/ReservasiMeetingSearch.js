import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export const moduleConfigs = {
  server:'http://localhost:3000',
  name:'meeting-room-reservations',
  nameForLabelInfo:'Reservasi ruang meeting',
  route:'ruang-meeting',
  label:{
    addNew:'Silahkan menginput informasi reservasi'
  },
  statusList:{
    available:'schedule_available'
  }

};

const ReservasiMeetingSearch = props => {
 
  
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [tanggal,setTanggal] = useState(null);
 

  

  const searchRuangMeeting = async (value) => {
    setTanggal(value);
    const result = await axios({
      method: "get",
      url: `${moduleConfigs.server}/ruang-meetings`,
     
    });

    // const params = {
    //   where:{
    //     waktu_meeting:{
    //       between: [moment(value).subtract(1,'days').format("YYYY-MM-DD"), moment(value).add(1,'days').format("YYYY-MM-DD")]
          
    //     }
        
    //   }
     
    // }

    const params = {
 
      where: {
       and:[ { waktu_meeting: {
     gt:new Date(moment(value).subtract(1,'seconds').format())
    }},
    { waktu_meeting: {
     lt:new Date(moment(value).add(1,"days").subtract(1,'seconds').format())
    }}
    ]
       
    }
      
    }

    const reservationData = await axios({
      method: "get",
      url: `${moduleConfigs.server}/${moduleConfigs.name}?filter=${JSON.stringify(params)}`,
     
    });

    let ruanganTerpakai = [];

    for(let element of reservationData.data){
        result.data.forEach(ruangan=> {
        
          if(ruangan.id_ruangan===element.ruangMeetingId){
            ruanganTerpakai.push(ruangan.id_ruangan);
          }
        });
    }

    const ruanganTersedia = result.data.filter(ruangan=>!ruanganTerpakai.includes(ruangan.id_ruangan))

  
    setData(ruanganTersedia);
  }

  const selectRuangMeeting = async (history,data,dataIndex) =>  {

    history.push(`/${moduleConfigs.route}/tambah`,{id_ruangan:data.id_ruangan,nama_ruangan:data.nama_ruangan,waktu_meeting:tanggal,jenis_input:'tambah',dataDefault:null});
  };

  

  return (
  
    <div className={classes.root}>
      
      <MyToolbar searchRuangMeeting={searchRuangMeeting} />
      <div className={classes.content}>
        <MyTable data={data} selectRuangMeeting={selectRuangMeeting} />
      </div>
    </div>
  );
};

export default ReservasiMeetingSearch;
