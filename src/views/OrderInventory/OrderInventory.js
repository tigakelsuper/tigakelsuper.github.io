import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import axios from 'axios';
import moment from 'moment';
import {getUserInfoFromToken} from '../../mymixin/mymixin';
import { useAuth } from "../../auth/auth";
import {isHCO} from '../../hakakses/hakakses';

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
  name:'order-inventories',
  nameForLabelInfo:'Order Inventory',
  route:'order-inventory',
  label:{
    addNew:'Silahkan menginput informasi order'
  },
  statusList:{
    submitted:'submitted',
    cancelled:'cancelled',
    approved:'approved',
    rejected:'rejected',
    onprocess:'on process',
    ready:'ready to pickup'
  }

};

const OrderInventory = () => {
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [dataSupir,setDataSupir] = useState([]);
  const { authTokens } = useAuth();


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
 


  
    let {user,inventory,...updatedFields} = datatransaksi 
    const transaksiForCancel = {
      ...updatedFields,
      status_order: moduleConfigs.statusList.cancelled
    }

    const cancelForTable = {
      ...datatransaksi,
      status_order: moduleConfigs.statusList.cancelled,
    }

    const newData = [
      ...data.slice(0,dataIndex),
      cancelForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id_order}`,transaksiForCancel);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil dibatalkan.`);
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };


  const confirmAction = async (history,datatransaksi,dataIndex) =>  {
 


  
    let {user,inventory,...updatedFields} = datatransaksi 
    const transaksiForOnProcess = {
      ...updatedFields,
      status_order: moduleConfigs.statusList.onprocess
    }

    const onProcessForTable = {
      ...datatransaksi,
      status_order: moduleConfigs.statusList.onprocess,
    }

    const newData = [
      ...data.slice(0,dataIndex),
      onProcessForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id_order}`,transaksiForOnProcess);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil dikonfirmasi.`);
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };


  const readyAction = async (history,datatransaksi,dataIndex) =>  {
 


  
    let {user,inventory,...updatedFields} = datatransaksi 
    const transaksiForReady = {
      ...updatedFields,
      status_order: moduleConfigs.statusList.ready
    }

    const onProcessForTable = {
      ...datatransaksi,
      status_order: moduleConfigs.statusList.ready,
    }

    const newData = [
      ...data.slice(0,dataIndex),
      onProcessForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`${moduleConfigs.server}/${moduleConfigs.name}/${datatransaksi.id_order}`,transaksiForReady);
     
      alert(`${moduleConfigs.nameForLabelInfo} berhasil siap di pick up.`);
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const params = {
    include: [
      {
        relation: "user"
      
      },
   {
        relation: "inventory"
      }
    ]
  };

  const userInfo = getUserInfoFromToken(authTokens);
  const {id,name} = userInfo;
  let paramsHCO = params;
  if(isHCO(name)){
    paramsHCO = {
      ...params,
      where: {
      or:[ {
        status_order: {
    ilike:moduleConfigs.statusList.approved
    
    }
      },
      {
        status_order: {
    ilike:moduleConfigs.statusList.onprocess
    
    }
      },
      {
        status_order: {
    ilike:moduleConfigs.statusList.ready
    
    }
  }
       ]
      
      
    }
  };
  }

  useEffect(() => {
   

   

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `${moduleConfigs.server}/${moduleConfigs.name}?filter=${JSON.stringify(paramsHCO)}`,
       
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  const filterDataByNomor = async (values) => {
    
    const filterData = values? values.filterData:null;
  
    let url = `${moduleConfigs.server}/${moduleConfigs.name}`;
    if(filterData){
      const paramsFilter = {
        ...paramsHCO,
        where: {
          nomor_order: {
      ilike:filterData
      
      }
        }
        
      };
      url = url.concat(`?filter=${JSON.stringify(paramsFilter)}`);
    }else{
      url = url.concat(`?filter=${JSON.stringify(paramsHCO)}`);
    }

    const result = await axios({
      method: "get",
      url: url,
     
    });
    setData(result.data);
  };

  

  return (
    <div className={classes.root}>
      <MyToolbar searchTransactionData={filterDataByNomor} />
      <div className={classes.content}>
        <MyTable data={data} cancelAction={cancelAction} approveAction={approveAction} confirmAction={confirmAction} readyAction={readyAction} />
      </div>
    </div>
  );
};

export default OrderInventory;
