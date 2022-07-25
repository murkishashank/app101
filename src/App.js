import { useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import './App.css';
import { RegistrationForm } from './RegistrationForm';
import { Users } from './Users';
import {LoginForm} from './LoginForm'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
    <Link to={"/registrationform/new"} onClick={handleStatus('registrationform')} >Resistration From</Link>
    <Link to={"/users"} onClick={handleStatus("users")} >Users</Link>
    <Routes>
      <Route path='/' element={<LoginForm/>}></Route>
      <Route path= '/registrationform/new' element={<RegistrationForm />}></Route>
        <Route path='/registrationForm/:userId' element={<RegistrationForm />}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
    </>
  );
}

export default App;
