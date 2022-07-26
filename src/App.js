import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import { RegistrationForm } from './RegistrationForm';
import {LoginForm} from './LoginForm'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Home';
import { Leave } from './Leave';
import { Profile } from './Profile';
import { Admin } from './Admin';
import { Users } from './Users'
function App() {

  const navigate = useNavigate();

  return (
    <>
    
    <Routes>
      <Route path='/' element={<LoginForm/>}></Route>
      <Route path= '/registrationform/new' element={<RegistrationForm />}></Route>
        <Route path='/registrationForm/:userId' element={<RegistrationForm />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/leave' element={<Leave/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/users' element={<Users/> }/>
        <Route path='/admin' element={<Admin/>} />
    </Routes>
    </>
  );
}

export default App;
