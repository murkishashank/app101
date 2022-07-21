import logo from './logo.svg';
import './App.css';
import { Routes, Route} from "react-router-dom";
import {RegistrationForm} from './RegistrationForm';
import {Users} from './Users';

function App() {
  return (
    <Routes>
        <Route path='/' element={<RegistrationForm />}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
  );
}

export default App;
