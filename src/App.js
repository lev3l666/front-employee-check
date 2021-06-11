import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { EmployeeList } from "./components/grid.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmployeeList></EmployeeList>
      </header>
    </div>
  );
}

export default App;
