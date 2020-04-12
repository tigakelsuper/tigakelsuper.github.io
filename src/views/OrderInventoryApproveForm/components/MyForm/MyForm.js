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
  InputLabel,
  Paper
} from '@material-ui/core';

import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import moment from 'moment'



import {moduleConfigs} from '../../../OrderInventory/OrderInventory';

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
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginRight: theme.spacing(1)
  },
}));

const MyForm = props => {
  const { className,simpan,data,style, ...rest } = props;


  const classes = useStyles();

  const [values, setValues] = useState({
    alasan_persetujuan:'',
    status_persetujuan:''

  });

  useEffect(() => {
    setValues({
      ...values,
      inventoryId: data.id_inventory,
      nama_barang:data.nama_barang,
    });

  

    if(data.jenis_input==='ubah'){
      
      setValues({
        ...values,
        id_order:data.dataDefault.id_order,
        waktu_ambil: data.dataDefault.waktu_ambil,
        nomor_order:data.dataDefault.nomor_order,
        jumlah:data.dataDefault.jumlah,
        inventoryId: data.dataDefault.inventory.id_inventory,
        nama_barang:data.dataDefault.inventory.nama_barang,
      });
    }
  }, []);


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
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
            onClick={()=>{
              const fixValues = {
                ...values,
                status_persetujuan:moduleConfigs.statusList.approved
              }
              simpan(history,fixValues);
            }
            }
          >
            Setuju
          </Button>
  ))

  const MyRejectButton = withRouter(({ history }) => (
    <Button
            color="default"
            variant="contained"
            onClick={()=>{
            
              const fixValues = {
                ...values,
                status_persetujuan:moduleConfigs.statusList.rejected
              }
              simpan(history,fixValues);
            }}
          >
            Tolak
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
       
          title='Persetujuan Permintaan Inventaris'
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
              <Paper className={clsx(classes.paper, className)}
      style={style}>
                <p>
                  Nomor Order : {data.dataDefault.nomor_order}
                </p>
                </Paper>
            </Grid>
            <p>&nbsp;<br/><br/><br/></p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Catatan Persetujuan"
                margin="dense"
                name="alasan_persetujuan"
                onChange={handleChange}
                required
                value={values.alasan_persetujuan}
                variant="outlined"
              />
            </Grid>

          

           
            
          </Grid>
        
        </CardContent>
        <Divider />
        <CardActions>
          <MyButton />
          <MyRejectButton />
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
