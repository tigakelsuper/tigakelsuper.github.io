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
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import decode from 'jwt-decode';
import { useAuth } from "./../../../../auth/auth";

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
  const { className, ...rest } = props;
  const { authTokens } = useAuth();

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    country: 'USA',
    mobil: '',
    tipePemesanan:'',
    tanggalPemesanan:moment().format("YYYY-MM-DD")
  });

  const [dataMobil, setDataMobil] = React.useState([]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: '',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  const tipePemesanans = [
    {
      value: '',
      label: ''
    },
    {
      value: 'dinas',
      label: 'Dinas'
    },
    {
      value: 'ekpedisi',
      label: 'Ekpedisi Barang'
    },
  ];

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const simpan = async (history) =>  {
 
    console.log(authTokens);

    var re = /"(.*?)"/g;

var myArray = authTokens.match(re);
var token = myArray[0].replace(/\"/g,"");
const userInfo = decode(token);

  
    try {
      const response = await axios.post('http://localhost:3000/pemesanan-mobils', {
        tanggal_pemesanan: moment(values.tanggalPemesanan).format(),
        tipe_pemesanan: values.tipePemesanan,
        keterangan: values.keterangan,
        mobilId:values.mobil,
        userId:parseInt(userInfo.id),
        status_pemesanan:'submitted',
      });
     // console.log(' Returned data:', response);
      handleOpen();
      history.push('/pemesanan-mobil');
    } catch (e) {
      alert("Terjadi kesalahan saat memproses permintaan Anda.");
      console.log(`Axios request failed: ${e}`);
    }
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
            onClick={()=>simpan(history)}
          >
            Simpan
          </Button>
  ))

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3000/mobils',
      );
      
      setDataMobil([{nomor_polisi:'',tipe_mobil:''}].concat(result.data));
    };
    fetchData();
  }, []);


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
          subheader="Silahkan menginput informasi pemesanan"
          title="Pemesanan Mobil"
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
                readOnly = {true}
                label="Tanggal Pemesanan"
                margin="dense"
                name="tanggal_pemesanan"
                type="date"
                onChange={handleChange}
                defaultValue="2020-04-04"
                required
                value={values.tanggalPemesanan}
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
                label="Tipe pemesanan"
                margin="dense"
                name="tipePemesanan"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.tipePemesanan}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {tipePemesanans.map(option => (
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
                label="Mobil"
                margin="dense"
                name="mobil"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.mobil}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {dataMobil.map(option => (
                  <option
                    key={option.nomor_polisi}
                    value={option.nomor_polisi}
                  >
                    {option.tipe_mobil} - {option.nomor_polisi}
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
          
                label="Keterangan"
                margin="dense"
                name="keterangan"
                onChange={handleChange}
                required
                value={values.keterangan}
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
