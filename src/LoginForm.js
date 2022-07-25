import { useState } from "react";
import { useNavigate,  } from "react-router-dom";
export const LoginForm = () =>{
    const navigate = useNavigate();
    const  [loginDetails, setLoginDetails] =useState({userName: '', password: ''});

async function fetchUserName(userName){
    const url = `http://localhost:8080/api/usersByUserName/${userName}`;
    const response = await fetch(url, {method: "GET"})
    const  data = await response.json();
    validateLogin(data);
}

function validateLogin (userDetails){
    const {userName, password} = loginDetails;
    if(Object.keys(userDetails).length){
        if(userName === userDetails.userName && password === userDetails.password){
            alert('Login successful');
            navigate('/')
        }
        else{
            alert("invalid username password");
        }
    }
    else{
        alert('user does not exist. Please Register Now')
    }
}



function handleOnChange(key, value){
    const loginDetailsClone = {...loginDetails, [key]: value}
    setLoginDetails(loginDetailsClone);
}


    return(
<div style={{height: 350, width:400, backgroundColor: 'white' , borderRadius: '25px', borderStyle: 'groove', marginLeft: '500px', marginTop:'90px', padding : '20px'}}>
    <form >
    <center><h3>User Login Form</h3></center>
        <div className="mb-3">
            <label><h6>User Name: </h6></label>
            <input
              className="form-control"
              placeholder="Enter User Name "
              id="userName"
              name="userName"
              onChange={(event)=>{handleOnChange('userName', event.target.value)}}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="lastName"> <h6>Password:</h6> </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              id="password"
              name="password"
              onChange={(event)=>{handleOnChange('password', event.target.value)}}
            />
            </div>
            <div>
<div style ={{marginTop: '10px'}} className="d-grid"><button  className="btn btn-primary" onClick={()=>{fetchUserName(loginDetails.userName)}}>Login</button></div>
<div style ={{marginTop: '10px'}} className="d-grid"><button className="btn btn-primary" onClick={()=>{navigate('/registrationform/new')}} >Sign Up</button></div>
</div>
</form>
</div>
    )
}