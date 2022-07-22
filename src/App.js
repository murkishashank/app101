import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import {RegistrationForm} from './RegistrationForm';
import {Users} from './Users';

function App() {

  const navigate = useNavigate();

  return (
    <>
    <button onClick={() => navigate(`/registrationform/new`)}>Sign Up</button>
    <button onClick={() => navigate("/users")}>All Users</button>
    <Routes>
        <Route path='/registrationForm/:userId' element={<RegistrationForm />}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
    </>
  );
}

export default App;
