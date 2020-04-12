import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { MyToolbar, MyTable } from './components';
import axios from 'axios';
import moment from 'moment';
import {moduleConfigs} from './../OrderInventory/OrderInventory';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const ReservasiMeetingSearch = props => {
 
  
  const classes = useStyles();

  const [data,setData] = useState([]);
  const [tanggal,setTanggal] = useState(null);
 
  useEffect(() => {
    
    searchMasterData(null);
  }, []);

  

  const searchMasterData = async (values) => {
    setTanggal(values);
 
    const filterData = values? values.filterData:null;
    console.log(filterData);
    let url = `${moduleConfigs.server}/inventories`;
    if(filterData){
      const params = {
  
        where: {
          nama_barang: {
      ilike:filterData
      
      }
        }
        
      };
      url = url.concat(`?filter=${JSON.stringify(params)}`);
    }

    

    const result = await axios({
      method: "get",
      url: url
     
    });

    
  
    setData(result.data);
  }

  const selectMasterData = async (history,data,dataIndex) =>  {

    history.push(`/${moduleConfigs.route}/tambah`,{id_inventory:data.id_inventory,nama_barang:data.nama_barang,jenis_input:'tambah',dataDefault:null});
  };

  

  return (
  
    <div className={classes.root}>
      
      <MyToolbar searchMasterData={searchMasterData} />
      <div className={classes.content}>
        <MyTable data={data} selectMasterData={selectMasterData} />
      </div>
    </div>
  );
};

export default ReservasiMeetingSearch;
