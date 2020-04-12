import React,  { useState, useEffect }  from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,

} from '@material-ui/core';

import { getInitials } from 'helpers';
import axios from 'axios';
import {getUserInfoFromToken} from './../../../../../mymixin/mymixin';
import {isAtasanPegawai,isHCO,isPegawai} from './../../../../../hakakses/hakakses';
import { useAuth } from "./../../../../../auth/auth";
import { withRouter } from 'react-router-dom'
import MySelectSupir from './../MySelectSupir';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function useHttpListCall(url) {
  const [list, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(url)
      .then(function(response) {
        setData(response.data);
      })
      .catch(function(error) {
        setError(error);
      });
  }, [url]);
  return { list, error };
}

const selectSupirData = [
  {
    value: '',
    label: ''
  },
  {
    value: 'Wahyu',
    label: 'Wahyu'
  },
  {
    value: 'Doni',
    label: 'Doni'
  },
];





const MyTable = props => {
  const { className, users, ...rest } = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(null);
  const [data, setData] = useState([]);
  const [dataSupir, setDataSupir] = useState([]);
  const { authTokens } = useAuth();

  useEffect(() => {
    const params = {
      include: [
        {
          relation: "user"
        
        },
     {
          relation: "mobil"
        },
        {
          relation: "supir"
        }
      ]
    };

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `http://localhost:3000/pemesanan-mobils?filter=${JSON.stringify(params)}`,
       
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  const supirParams = {
    where: {
        status_tersedia:"tersedia"
      }
    };

  useEffect(() => {
    const fetchData = async () => {
    //  const result = await axios(`http://localhost:3000/supirs`);
    const result = await axios({
      method: "get",
      url: `http://localhost:3000/supirs?filter=${JSON.stringify(supirParams)}`,
     
    })
      setDataSupir(result.data);
    };
    fetchData();
  }, []);

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const userInfo = getUserInfoFromToken(authTokens);
  const {name} = userInfo;
  const showApproveButton = isAtasanPegawai(name);
  const showSelectSupir = isHCO(name);
  const showCancelButton = isPegawai(name);


  const approvePemesanan = async (history,datapemesanan,dataIndex) =>  {

    let {user,mobil,...updatedFields} = datapemesanan 
    const pemesananForApprove = {
      ...updatedFields,
      status_pemesanan: 'approved',
      userId : datapemesanan.user.id,
      mobilId: datapemesanan.mobil.nomor_polisi
    }

    const approveForTable = {
      ...datapemesanan,
      status_pemesanan: 'approved',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      approveForTable,
      ...data.slice(dataIndex+1)

    ];
 
 
    try {
      const response = await axios.put(`http://localhost:3000/pemesanan-mobils/${datapemesanan.id}`,pemesananForApprove);
       alert("Pemesanan Mobil berhasil di setujui.");
       setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const cancelPemesanan = async (history,datapemesanan,dataIndex) =>  {
 


  
    let {user,mobil,...updatedFields} = datapemesanan 
    const pemesananForCancel = {
      ...updatedFields,
      status_pemesanan: 'cancelled',
      userId : datapemesanan.user.id,
      mobilId: datapemesanan.mobil.nomor_polisi
    }

    const cancelForTable = {
      ...datapemesanan,
      status_pemesanan: 'cancelled',
    }

    const newData = [
      ...data.slice(0,dataIndex),
      cancelForTable,
      ...data.slice(dataIndex+1)

    ];

    try {
      const response = await axios.put(`http://localhost:3000/pemesanan-mobils/${datapemesanan.id}`,pemesananForCancel);
     
      alert("Pemesanan berhasil dibatalkan.");
      setData(newData);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const MyButton = withRouter(({ history,datapemesanan,dataIndex}) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { approvePemesanan(history,datapemesanan,dataIndex) }}
    >
     Approve
    </Button>
  ))

  const MyCancelButton = withRouter(({ history,datapemesanan,dataIndex}) => (
    <Button
       color="secondary"
          variant="contained"
      onClick={() => { cancelPemesanan(history,datapemesanan,dataIndex) }}
    >
     Cancel
    </Button>
  ))


 


 

  // const selectSupir = () => (
  
  //     <div>
  //       Hello
  //     </div>
  //     <FormControl variant="filled">
  //     <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
  //     <Select
  //       labelId="demo-simple-select-filled-label"
  //       id="demo-simple-select-filled"
  //       value = {age}
  //       onChange={handleChange}
  //     >
  //       <MenuItem value="">
  //         <em>None</em>
  //       </MenuItem>
  //       <MenuItem value={10}>Ten</MenuItem>
  //       <MenuItem value={20}>Twenty</MenuItem>
  //       <MenuItem value={30}>Thirty</MenuItem>
  //     </Select>
  //   </FormControl>
     
  //   )
  
  

  return (

   
    
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Tanggal Pemesanan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Pemesan</TableCell>
                  <TableCell>Tipe Pemesanan</TableCell>
                  <TableCell>Mobil</TableCell>
                  <TableCell>Supir</TableCell>
                  <TableCell>Keterangan</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, rowsPerPage).map( (dt,dataIndex) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={dt.id}
                    selected={selectedUsers.indexOf(dt.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(dt.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, dt.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                     
                        <Typography variant="body1"> {moment(dt.tanggal_pemesanan).format('DD/MM/YYYY')}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      {dt.status_pemesanan}
                    </TableCell>
                    <TableCell>{dt.user?dt.user.username:''}</TableCell>
                    <TableCell>
                      {dt.tipe_pemesanan}
                    </TableCell>
                    <TableCell>{dt.mobil?dt.mobil.tipe_mobil:''}</TableCell>
                    <TableCell>{dt.supir?dt.supir.nama:''}</TableCell>
                    <TableCell>
                         {dt.keterangan}
                    </TableCell>
                    <TableCell>
                    { (showCancelButton  && dt.status_pemesanan==='submitted')?(
                            <MyCancelButton datapemesanan={dt} dataIndex={dataIndex} />
                           
                         ):(
                          <div></div>
                         )}
                         { (showApproveButton  && dt.status_pemesanan==='submitted')?(
                            <MyButton datapemesanan={dt} dataIndex={dataIndex} />
                           
                         ):(
                          <div></div>
                         )}
                          { (showSelectSupir && dt.status_pemesanan==='approved')?(
                           <MySelectSupir datasupir={dataSupir} datapemesanan={dt} dataIndex={dataIndex} parentSetData={setData} parentData={data} />
                         ):(
                          <div></div>
                         )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

MyTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default MyTable;
