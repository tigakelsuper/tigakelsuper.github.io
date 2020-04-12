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



import {moduleConfigs} from '../../../ReservasiMeeting/ReservasiMeeting';

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

 
  console.log(data);
 

  const classes = useStyles();

  const [values, setValues] = useState({
    id_ruangan:0,
    nama_ruangan:'',
    fasilitas_ruangan:'',
    kapasitas:'',
    foto:'foto',
    status_tersedia:'available'
  });

  useEffect(() => {
    setValues({
      ...values,
      id_ruangan:data.dataDefault.id_ruangan,
      nama_ruangan:data.dataDefault.nama_ruangan,
      fasilitas_ruangan:data.dataDefault.fasilitas_ruangan,
      kapasitas:data.dataDefault.kapasitas
      
    });

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
          
                label="Nama Ruangan"
                margin="dense"
                name="nama_ruangan"
                onChange={handleChange}
                required
                value={values.nama_ruangan}
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
          
                label="Fasilitas Ruangan"
                margin="dense"
                name="fasilitas_ruangan"
                onChange={handleChange}
                required
                value={values.fasilitas_ruangan}
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
          
                label="Kapasitas"
                margin="dense"
                name="kapasitas"
                onChange={handleChange}
                required
                value={values.kapasitas}
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
