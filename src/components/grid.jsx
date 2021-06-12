import React from 'react';
import {get, post} from '../services/api';
import { employees } from "../services/endpoint.json";
import { DataGrid } from '@material-ui/data-grid';

export class EmployeeList extends React.Component {
constructor() {
    super();
        this.state = { 
            users: [] 
        };
    }

    async componentDidMount() {
        await get(employees).then(res => {
            // console.log('res: ',res.data.message);
            this.setState({users : res.data.message })
        });
    }

  render() {
    return (
        <div>
            {/* <ul>
            {this.state.users.map(user => <li>{user.name1} mail: {user.mail}</li>)}
            </ul> */}
            <div style={{ height: '85vh', width: '100%' }}>
      <DataGrid rows={this.state.users} columns={columns} pageSize={10}/>
    </div>
        </div>
    )
  }
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
  ];

export default EmployeeList;