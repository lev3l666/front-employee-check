import React, { useEffect, useCallback } from 'react';
import {del, get, put} from '../services/api';
import { employees, update, deleteUser } from "../services/endpoint.json";
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

export function DrawTable() {

  const [employeeList, setEmployeeList] = React.useState([]);
  const [random, setRandom] = React.useState(Math.random());

  useEffect(() => {
    async function fetchData(){
        const request = await get(employees).then(res => {
            console.log('employees: ',res.data.message);
            setEmployeeList(res.data.message);
        });
        return request;
    }
    fetchData();
}, [random])

const reRender = () => setRandom(Math.random());

const updateRequest = useCallback(async (data) => {
  
  console.log('field: ', data.field,'\nID:', data.id, '\nValue:', data.props.value);
  let params = { id: data.id, field: data.field, value: data.props.value};

  const request = await put(update, params).then(res => {
    console.log('update: ',res.data);
    if (res.data.error === null) {
      let msg = res.data.message;
      console.log(msg);
      alert(`Data saved!`);
    }
    else {
      console.log('tst', res.data.message);
      alert(`Error!:${res.data.error}\n${res.data.message}`);
      setRandom(Math.random());
    }        
  }).catch(error => {
    console.log('Err',error);

    alert(`Error!:${error}\n${error}`);
  });
  return request;

}, []);

    return (
        <div>
            {/* <ul>
            {this.state.users.map(user => <li>{user.name1} mail: {user.mail}</li>)}
            </ul> */}
            <div style={{ height: '85vh', width: '100%' }}>
      <DataGrid 
      rows={employeeList} 
      columns={columns} 
      pageSize={10}
      onEditCellChangeCommitted={(values) => {
        updateRequest(values)
      }}
      />
    </div>
        </div>
    )
}

const renderDeleteButton = (params) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={async () => {
                  console.log('===>>>',params.row.id)
                  const result = window.confirm(`Do you want to delete user ${params.row.name1} ${params.row.lastName1}?`);
                  if (result === true) {
                    await del(deleteUser, params.row.id).then(res => {
                      console.log('delete: ',res.data);
                      if (res.data.error === null) {
                        alert(`User deleted!`);
                        window.location.reload(true);
                      }
                      else {
                        alert(`Error!:${res.data.error}\n${res.data.message}`);
                      }        
                    }).catch(error => {
                      alert(`Error!:\n${error}`);
                    });
                  }
              }}
          >
              Delete
          </Button>
      </strong>
  )
}

const columns = [
    // { field: 'id', headerName: 'ID', editable: false, width: 150 }, disabled
    { field: 'name1', headerName: 'First name', editable: true, width: 150 },
    { field: 'name2', headerName: 'Second name', editable: true  , width: 150},
    { field: 'lastName1', headerName: 'First lastname', editable: true  , width: 150},
    { field: 'lastName2', headerName: 'Second lastname', editable: true  , width: 150},
    { field: 'country', headerName: 'Country', editable: true  , width: 150}, // list
    { field: 'area', headerName: 'Area', editable: true  , width: 150}, // list
    { field: 'idType', headerName: 'ID Type', editable: true  , width: 150}, // list
    { field: 'employeeId', headerName: 'Employee ID', editable: true  , width: 150}, // no se si editable
    { field: 'mail', headerName: 'Email', editable: false  , width: 150}, 
    { field: 'admission', headerName: 'Admission', type: 'dateTime', editable: true, width: 150},
    // { field: 'status', headerName: 'Status', editable: false  , width: 150}, disabled
    { field: 'createdAt', headerName: 'createdAt', type: 'dateTime', editable: false, width: 150},
    { field: 'updatedAt', headerName: 'updatedAt', type: 'dateTime', editable: false, width: 150},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
  ];

  export default DrawTable;