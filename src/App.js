import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import { RegistrationForm } from './RegistrationForm';
import { Users } from './Users';
import {LoginForm} from './LoginForm'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

  const navigate = useNavigate();

  return (
    <>
    
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
