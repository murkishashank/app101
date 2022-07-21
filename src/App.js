import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link} from "react-router-dom";
import {RegistrationForm} from './RegistrationForm';
import {Users} from './Users';

function App() {
  const [startsStatus, setStartStatus] = useState("Registration Form");
  const [status, setStatus] = useState("Y");

  const handleStatus = () => {
    if(startsStatus == "Registration Form" & status == "Y"){
        setStartStatus("");
    }
}

  return (
    <>
    <Link to={"/registrationForm"} onClick={handleStatus} >{startsStatus}</Link>
    <Routes>
        <Route path='/registrationForm' element={<RegistrationForm />}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
    </>
  );
}

export default App;
