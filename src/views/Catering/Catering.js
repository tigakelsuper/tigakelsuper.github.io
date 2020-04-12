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
  name:'caterings',
  nameForLabelInfo:'Catering',
  route:'catering',
  label:{
    addNew:'Silahkan menginput informasi catering'
  },
  statusList:{
    available:'available'
  }

};

const ReservasiMeeting = () => {
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [dataSupir,setDataSupir] = useState([]);

  const approveAction = async (history,datatransaksi,dataIndex) =>  {

    let {user,mobil,...updatedFields} = datatransaksi 
    const transaksiForApprove = {
      ...updatedFields,
      status_pemesanan: 'approved',
      userId : datatransaksi.user.id,
      mobilId: datatransaksi.mobil.nomor_polisi
    }

    const approveForTable = {
      ...datatransaksi,
      status_pemesanan: 'approved',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      approveForTable,
      ...data.slice(dataIndex+1)

    ];
 
 
    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id}`,transaksiForApprove);
       alert(`${moduleConfigs.nameForLabelInfo} berhasil di setujui.`);
       setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const cancelAction = async (history,datatransaksi,dataIndex) =>  {
 


  
    let {user,ruangMeeting,...updatedFields} = datatransaksi 
    const transaksiForCancel = {
      ...updatedFields,
      status: 'cancelled'
    }

    const cancelForTable = {
      ...datatransaksi,
      status: 'cancelled',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      cancelForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id_meeting_room_res}`,transaksiForCancel);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil dibatalkan.`);
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  useEffect(() => {
    const params = {
      include: [
        {
          relation: "user"
        
        }
      ]
    };

   

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/${moduleConfigs.name}?filter=${JSON.stringify(params)}`,
       
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  const filterDataByDate = async (dataFilter) => {
    console.log(dataFilter);
    const params = {
      include: [
        {
          relation: "user"
        
        }
      ]
    };

    let fixParams = params;

    if(dataFilter.startDate && dataFilter.endDate){
      fixParams = {
        ...params,
        where: {
          and:[ { tanggal: {
        gt:new Date(moment(dataFilter.startDate).subtract(1,'seconds').format())
       }},
       { tanggal: {
        lt:new Date(moment(dataFilter.endDate).add(1,"days").subtract(1,'seconds').format())
       }}
       ]
          
       }
      }
    }

    const result = await axios({
      method: "get",
      url: `${moduleConfigs.server}/${moduleConfigs.name}?filter=${JSON.stringify(fixParams)}`,
     
    });
    setData(result.data);
  };

  

  return (
    <div className={classes.root}>
      <MyToolbar rangedDataInputOnClick={filterDataByDate} />
      <div className={classes.content}>
        <MyTable data={data} cancelAction={cancelAction} approveAction={approveAction} />
      </div>
    </div>
  );
};

export default ReservasiMeeting;
