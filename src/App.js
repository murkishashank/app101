import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link} from "react-router-dom";
import {RegistrationForm} from './RegistrationForm';
import {Users} from './Users';

function App() {
  const [startsStatus, setStartStatus] = useState("");
  const [status, setStatus] = useState("Y");

  const handleStatus = (page) => {
    if(startsStatus == "" & status == "Y"){
        setStartStatus(page);
    }
}

  return (
    <>
    <Link to={"/registrationform"} onClick={handleStatus('registrationform')} >Resistration From</Link>
    <Link to={"/users"} onClick={handleStatus("users")} >Users</Link>
    <Routes>
        <Route path='/registrationForm' element={<RegistrationForm />}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
    </>
  );
}

export default App;
