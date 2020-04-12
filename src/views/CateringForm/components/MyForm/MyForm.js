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



import {moduleConfigs} from '../../../Catering/Catering';

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
  const { className,simpan,data,profileInfo, ...rest } = props;

 

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     waktu_meeting: data.waktu_meeting,
  //     nama_ruangan:data.nama_ruangan
  //   });
  // });

  

 

  const classes = useStyles();

  const [values, setValues] = useState({
    id_catering:0,
    jumlah:0,
    jenis_catering:'',
    departemen:'',
    tanggal:''
  });

  useEffect(() => {
    setValues({
      ...values,
      departemen:profileInfo.departemen,
      tanggal:new Date()
    });


    if(data.jenis_input==='ubah'){
      setValues({
        ...values,
        id_catering:data.dataDefault.id_catering,
        jumlah:data.dataDefault.jumlah,
        jenis_catering:data.dataDefault.jenis_catering,
        departemen:data.dataDefault.departemen,
        tanggal:data.dataDefault.tanggal
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

  const jenisCaterings = [
    {
      value: '',
      label: ''
    },
    {
      value: 'makan siang',
      label: 'Makan Siang'
    },
    {
      value: 'makan malam',
      label: 'Makan Malam'
    },
  ];

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
          
                label="Departemen"
                margin="dense"
                name="departemen"
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
                required
                value={values.departemen}
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
          
                label="Tanggal Catering"
                margin="dense"
                name="tanggal"
                InputProps={{
                  readOnly: true,
                }}
             
                value={moment(values.tanggal).format('DD-MM-YYYY')}
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
          
                label="Jumlah"
                margin="dense"
                name="jumlah"
                onChange={handleChange}
                value={values.jumlah}
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
                label="Jenis Catering"
                margin="dense"
                name="jenis_catering"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.jenis_catering}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {jenisCaterings.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
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
