import React, { useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import moment from 'moment'



import {moduleConfigs} from '../../../StockInventory/StockInventory';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MyForm = props => {
  const { className,simpan,data, ...rest } = props;

 
 

  const classes = useStyles();

  const [values, setValues] = useState({
    id_inventory:0,
    nama_barang:'',
    stok:'',
    tipe_barang:'',
    nomor_barang:'',
    kode_barang:'',
    jumlah_kedatangan:0,
    nomor_do:'',
    nomor_po:''
  });

  const [readOnlyField,setReadOnlyField] = useState({
    nama_barang:false,
    tipe_barang:false,
    nomor_barang:false,
    kode_barang:false,
  });

  useEffect(() => {
    setValues({
      ...values,
      id_inventory:data.dataDefault.id_inventory,
      nama_barang:data.dataDefault.nama_barang,
      stok:data.dataDefault.stok,
      tipe_barang:data.dataDefault.tipe_barang,
      nomor_barang:data.dataDefault.nomor_barang,
      kode_barang:data.dataDefault.kode_barang,
      jumlah_kedatangan:data.jenis_input==='ubah'?'':data.dataDefault.jumlah_kedatangan,
      nomor_do:data.jenis_input==='ubah'?'':data.dataDefault.nomor_do,
      nomor_po:data.jenis_input==='ubah'?'':data.dataDefault.nomor_po
      
    });

    if(data.jenis_input==='ubah'){
      setReadOnlyField({
        ...readOnlyField,
        nama_barang:true,
        tipe_barang:true,
        nomor_barang:true,
        kode_barang:true,
        
      });
    }

  }, []);

  const tipeBarang = [
    {
      value: '',
      label: ''
    },
    {
      value: 'Seragam',
      label: 'Seragam'
    },
    {
      value: 'Kursi',
      label: 'Kursi'
    },
    {
      value: 'Meja',
      label: 'Meja'
    },
  ];


  const handleChange = event => {
    if(event.target.name==='tipe_barang'){
      if(event.target.length > 1){
        setValues({
          ...values,
          tipe_barang: event.target.value,
          kode_barang: event.target.value.concat(moment().format('ss'))
        });
      }
     
    }else{
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
   
  };

 

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

 

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Notifikasi</h2>
      <p id="simple-modal-description">
        Data tersimpan!
      </p>
      
    </div>
  );

  const MyButton = withRouter(({ history }) => (
    <Button
            color="primary"
            variant="contained"
            onClick={()=>simpan(history,values)}
          >
            Simpan
          </Button>
  ))

 


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader={moduleConfigs.label.addNew}
          title={moduleConfigs.nameForLabelInfo}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Nama Barang"
            
                margin="dense"
                name="nama_barang"
                onChange={handleChange}
                required
                value={values.nama_barang}
                InputProps={{
                  readOnly: readOnlyField.nama_barang,
                }}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Tipe barang"
                margin="dense"
                name="tipe_barang"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.tipe_barang}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: readOnlyField.tipe_barang,
                }}
              >
                {tipeBarang.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Kode barang"
                margin="dense"
                name="kode_barang"
                readOnly={true}
                onChange={handleChange}
                InputProps={{
                  readOnly: readOnlyField.kode_barang,
                }}
                required
                value={values.kode_barang}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Nomor barang"
                margin="dense"
                name="nomor_barang"
                onChange={handleChange}
                required
                value={values.nomor_barang}
                InputProps={{
                  readOnly: readOnlyField.nomor_barang,
                }}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Jumlah kedatangan"
                margin="dense"
                name="jumlah_kedatangan"
                onChange={handleChange}
                required
                value={values.jumlah_kedatangan}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Nomor Delivery Order"
                margin="dense"
                name="nomor_do"
                onChange={handleChange}
                required
                value={values.nomor_do}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Nomor Purchase Order"
                margin="dense"
                name="nomor_po"
                onChange={handleChange}
                required
                value={values.nomor_po}
                variant="outlined"
              />
            </Grid>

            

          
           
           
            
            
            
          </Grid>
        
        </CardContent>
        <Divider />
        <CardActions>
          <MyButton />
        </CardActions>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Card>
  );
};

MyForm.propTypes = {
  className: PropTypes.string
};

export default MyForm;
