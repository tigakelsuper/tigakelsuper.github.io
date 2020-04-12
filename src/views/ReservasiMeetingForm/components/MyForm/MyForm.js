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



import {moduleConfigs} from './../../../ReservasiMeeting/ReservasiMeeting';

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

 

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     waktu_meeting: data.waktu_meeting,
  //     nama_ruangan:data.nama_ruangan
  //   });
  // });

  

 

  const classes = useStyles();

  const [values, setValues] = useState({
    waktuMeeting:null,
    startMeeting:null,
    endMeeting:null,
    agenda:'',
    deskripsi:'',
    waktu_meeting:'',
    nama_ruangan:'',
    id_ruangan:0,
    id_meeting_room_res:0
  });

  useEffect(() => {
    setValues({
      ...values,
      waktu_meeting: data.waktu_meeting,
      nama_ruangan:data.nama_ruangan,
      waktuMeeting:data.waktu_meeting,
      startMeeting:data.waktu_meeting,
      endMeeting:data.waktu_meeting,
      id_ruangan:data.id_ruangan,
      
    });

    console.log(data.dataDefault);

    if(data.jenis_input==='ubah'){
      setValues({
        ...values,
        waktu_meeting: data.dataDefault.waktu_meeting,
        nama_ruangan:data.dataDefault.ruangMeeting.nama_ruangan,
        waktuMeeting:data.dataDefault.waktu_meeting,
        startMeeting:data.dataDefault.start_meeting,
        endMeeting:data.dataDefault.end_meeting,
        id_ruangan:data.dataDefault.ruangMeetingId,
        agenda:data.dataDefault.agenda,
        deskripsi:data.dataDefault.deskripsi,
        id_meeting_room_res:data.dataDefault.id_meeting_room_res
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
          
                label="Tanggal Reservasi"
                margin="dense"
                name="agenda"
                InputProps={{
                  readOnly: true,
                }}
             
                value={moment(values.waktu_meeting).format('DD-MM-YYYY')}
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
          
                label="Ruang Meeting"
                margin="dense"
                name="agenda"
                InputProps={{
                  readOnly: true,
                }}
            
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
          
                label="Agenda"
                margin="dense"
                name="agenda"
                onChange={handleChange}
                required
                value={values.agenda}
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
               
                label="Waktu Pakai Ruang Meeting"
                margin="dense"
                name="startMeeting"
                type="date"
                onChange={handleChange}
                required
                value={values.startMeeting}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
              
                label="Waktu Selesai Ruang Meeting"
                margin="dense"
                name="endMeeting"
                type="date"
                onChange={handleChange}
                required
                value={values.endMeeting}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
           
           
            
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
          
                label="Deskripsi"
                margin="dense"
                name="deskripsi"
                onChange={handleChange}
                required
                value={values.deskripsi}
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
