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

import {getUserInfoFromToken} from '../../../../../mymixin/mymixin';
import {isAtasanPegawai,isHCO,isPegawai} from '../../../../../hakakses/hakakses';
import { useAuth } from "../../../../../auth/auth";
import { withRouter } from 'react-router-dom'
import {moduleConfigs} from '../../../../Catering/Catering';


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




const MyTable = props => {
  const { className, data,cancelAction,approveAction, ...rest } = props;

  const [modalShow, setModalShow] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(null);
  const [dataSupir, setDataSupir] = useState([]);
  const { authTokens } = useAuth();

 

 
  

  const classes = useStyles();

  const [selectedData, setSelectedData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { data } = props;

    let selectedData;

    if (event.target.checked) {
      selectedData = data.map(user => user.id);
    } else {
      selectedData = [];
    }

    setSelectedData(selectedData);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedData.indexOf(id);
    let newSelectedData = [];

    if (selectedIndex === -1) {
      newSelectedData = newSelectedData.concat(selectedData, id);
    } else if (selectedIndex === 0) {
      newSelectedData = newSelectedData.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newSelectedData = newSelectedData.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedData = newSelectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      );
    }

    setSelectedData(newSelectedData);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const userInfo = getUserInfoFromToken(authTokens);
  const {id,name} = userInfo;
  const showApproveButton = isAtasanPegawai(name);

  console.log(userInfo);
  

  const MyButton = withRouter(({ history,datatransaksi,dataIndex}) => (
    <Button
       color="primary"
          variant="contained"
      onClick={() => { approveAction(history,datatransaksi,dataIndex) }}
    >
     Approve
    </Button>
  ))

  const MyCancelButton = withRouter(({ history,datatransaksi,dataIndex}) => (
    <Button
       color="secondary"
          variant="contained"
      onClick={() => { cancelAction(history,datatransaksi,dataIndex) }}
    >
     Cancel
    </Button>
  ))

  const MyViewDetailButton = withRouter(({ history,datatransaksi,dataIndex}) => (
    <Button
       color="secondary"
          variant="contained"
      onClick={() => { history.push(`/${moduleConfigs.route}/view`,{jenis_input:'ubah',dataDefault:datatransaksi}) }}
    >
     Update
    </Button>
  ))


  

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
                      checked={selectedData.length === data.length}
                      color="primary"
                      indeterminate={
                        selectedData.length > 0 &&
                        selectedData.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Tanggal Catering</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Pemesan</TableCell>
                  <TableCell>Jenis Catering</TableCell>
               
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, rowsPerPage).map( (dt,dataIndex) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={dt.id}
                    selected={selectedData.indexOf(dt.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedData.indexOf(dt.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, dt.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                     
                        <Typography variant="body1"> {moment(dt.tanggal).format('DD/MM/YYYY')}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      {dt.jumlah}
                    </TableCell>
                   
                    <TableCell>{dt.user?dt.user.username:''}</TableCell>
                    <TableCell>
                      {dt.jenis_catering}
                    </TableCell>
                 
                    <TableCell>
                    { (dt.userId===parseInt(id))?(
                            <div>
                                {/* <MyCancelButton datatransaksi={dt} dataIndex={dataIndex} /> */}
                            <MyViewDetailButton datatransaksi={dt} dataIndex={dataIndex} />
                            </div>
                            
                           
                         ):(
                          <div></div>
                         )}
                         {/* { (showApproveButton  && dt.status_pemesanan==='submitted')?(
                            <MyButton datatransaksi={dt} dataIndex={dataIndex} />
                           
                         ):(
                          <div></div>
                         )} */}
                         
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
          count={data.length}
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
  data: PropTypes.array.isRequired
};

export default MyTable;
