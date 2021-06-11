import React from 'react';
import {get, post} from '../services/api';
import { employees } from "../services/endpoint.json";

let response = async () => { return await get(employees) };
export class EmployeeList extends React.Component {
constructor() {
    super();
        this.state = { 
            users: [] 
        };
    }

    async componentDidMount() {
        console.log('antes');
        await get(employees).then(res => {
            console.log('res: ',res.data.message);
            this.setState({users : res.data.message })
        });
    }

  render() {
    return (
        <div>
            <ul>
            {this.state.users.map(user => <li>{user.name1} mail: {user.mail}</li>)}
            </ul>
        </div>
    )
  }
}



export default EmployeeList;