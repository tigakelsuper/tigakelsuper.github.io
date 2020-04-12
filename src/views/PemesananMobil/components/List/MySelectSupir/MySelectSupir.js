import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button,   TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem} from '@material-ui/core';

import { SearchInput } from 'components';
import { withRouter } from 'react-router-dom'
import axios from 'axios'

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

const MySelectSupir = props => {
  const { className,history,datasupir,datapemesanan,dataIndex,parentSetData,parentData, ...rest } = props;


  const classes = useStyles();

  const [age, setAge] = React.useState('');
   
  const handleChange = (event) => {

    setAge(event.target.value);
    updateSupir(history,event.target.value);
  };

  const updateSupir = async (history,supirId) =>  {

    let {user,mobil,...updatedFields} = datapemesanan 
    const pemesananForAllocated = {
      ...updatedFields,
      status_pemesanan: 'allocated',
      userId : datapemesanan.user.id,
      mobilId: datapemesanan.mobil.nomor_polisi,
      supirId:parseInt(supirId)
    }

    const selectedSupir = datasupir.find(({id})=>id===supirId);

    const allocatedForTable = {
      ...datapemesanan,
      status_pemesanan: 'allocated',
      supir: {id:parseInt(supirId),nama:selectedSupir.nama}
    }

    const newData = [
      ...parentData.slice(0,dataIndex),
      allocatedForTable,
      ...parentData.slice(dataIndex+1)

    ];


 
 
    try {
      const response = await axios.put(`http://localhost:3000/pemesanan-mobils/${datapemesanan.id}`,pemesananForAllocated);
     
      alert('Pemesanan berhasil di alokasi ke supir.');
      parentSetData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  return (
    <FormControl variant="filled">
         <InputLabel id="demo-simple-select-filled-label">Pilih Supir</InputLabel>
         <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value = {age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {datasupir.map(item=>(
               <MenuItem value={item.id}>{item.nama}</MenuItem>
          ))}
         
         
        </Select>
      </FormControl>
  );
};

MySelectSupir.propTypes = {
  history:PropTypes.any,
  className: PropTypes.string
};

export default MySelectSupir;
