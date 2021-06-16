import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import EmployeeList from "./grid.jsx";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {get, post, put} from '../services/api';
import { countries, idtypes, areas, create } from "../services/endpoint.json";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
  


const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function BottomAppBar() {
    const classes = useStyles();
    //const
    const [open, setOpen] = React.useState(false);
    const [countryList, setCountryList] = React.useState(false);
    const [country, setCountry] = React.useState('co');
    const [idTypeList, setidTypeList] = React.useState(false);
    const [idType, setIdType] = React.useState('CC');
    const [areaList, setAreaList] = React.useState(false);
    const [area, setArea] = React.useState('admn');
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [random, setRandom] = React.useState(Math.random());
    // handlers
    const handleOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const handleIdTypeChange = (event) => {
        setIdType(event.target.value);
    };
    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    const fName = useRef(null);
    const sName = useRef(null);
    const lName1 = useRef(null);
    const lName2 = useRef(null);
    const eId = useRef(null);

    const fetchRequest = useCallback(async () => {
      let tmpSname = (sName.current.value).trim();
      if ( !tmpSname ) {
        tmpSname = null;
      }
      const params = {
        "employeeId": eId.current.value,
        "lastName1": lName1.current.value,
        "lastName2": lName2.current.value,
        "name1": fName.current.value,
        "name2": tmpSname,
        "country": country,
        "idType": idType,
        "area": area,
        "admission": selectedDate
      }
      
      const request = await post(create, params).then(res => {
        console.log('create: ',res.data);
        if (res.data.error === null) {
          let msg = res.data.message;
          console.log(msg);
          alert(`User ${msg.name1} created!\nYour new e-mail is: ${msg.mail}`);
          setRandom(Math.random())
          handleClose();
          window.location.reload(true);
        }
        else {
          console.log(res.data.message);
          alert(`Error!:${res.data.error}\n${res.data.message}`);
        }        
      }).catch(error => {
        console.log('Err',error);
        if ( error !== undefined) {
          console.log(error.response.data);
          let msgParser = JSON.parse(JSON.stringify(error.response.data.message));
          let errorMsg = JSON.parse(JSON.stringify(error.response.data.error));
          console.log(msgParser);
          alert(`Error!:${errorMsg}\n${msgParser}`);
          }
      });
      return request;
  }, [create, country, idType, area, selectedDate, fName, sName, lName1, lName2, eId, handleClose]);

    //effects
  //   useEffect(() => {
  //     async function fetchData(){
  //         const request = await post(create).then(res => {
  //             console.log('create: ',res.data);
  //             // setCountryList(res.data);
  //         }).catch(error => {
  //           console.log(error)
  //         });
  //         return request;
  //     }
  //     fetchData();
  // }, [create])

    useEffect(() => {
        async function fetchData(){
            const request = await get(countries).then(res => {
                console.log('Countries: ',res.data);
                setCountryList(res.data);
            });
            return request;
        }
        fetchData();
    }, [countries])

    useEffect(() => {
        async function fetchData(){
            const request = await get(idtypes).then(res => {
                console.log('idtypes: ',res.data);
                setidTypeList(res.data);
            });
            return request;
        }
        fetchData();
    }, [idtypes])

    useEffect(() => {
        async function fetchData(){
            const request = await get(areas).then(res => {
                console.log('Areas: ',res.data);
                setAreaList(res.data);
            });
            return request;
        }
        fetchData();
    }, [areas])

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Employee list
        </Typography>
        <EmployeeList triggerRender={random}></EmployeeList>
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon onClick={handleOpen}/>
          </Fab>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Fade in={open}>
          <div className={classes.paper}>
              <h3>Add a new employee</h3>       
            <div>
                <TextField inputRef={fName} required id="fName" label="First Name" />
                <TextField inputRef={sName} id="sName" label="Second Name" />
            </div>
            <br/>
            <div>
                <TextField inputRef={lName1} required id="lName1" label="Last Name 1" />
                <TextField inputRef={lName2} required id="lName2" label="Last Name 2" />
            </div>
            <br/>
            <div>
              <TextField
                  id="select-typeidType"
                  select
                  label="ID Type"
                  value={idType}
                  onChange={handleIdTypeChange}
                  helperText="Please select your ID Type"
                  >
                  {Object.values(idTypeList).map((option) => (
                      <MenuItem key={option} value={option}>
                      {option}
                      </MenuItem>
                  ))}
              </TextField>
              <TextField inputRef={eId} required id="standard-requiredeId" label="ID" />
            </div>
            <br/>
            <div>
              <TextField
                id="select-country"
                select
                label="Country"
                value={country}
                onChange={handleCountryChange}
                helperText="Please select your country"
                >
                {Object.values(countryList).map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
             </TextField>
              <TextField
                id="select-area"
                select
                label="Area"
                value={area}
                onChange={handleAreaChange}
                helperText="Please select your Area"
                >
                {Object.values(areaList).map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
             </TextField>
            </div>
            <br/>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Admission date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
                <Button variant="contained" color="primary" onClick={fetchRequest}>
                    Save
                </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

export default BottomAppBar;