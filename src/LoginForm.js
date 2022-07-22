import { useState } from "react";
import { useNavigate,  } from "react-router-dom";
export const LoginForm = () =>{
    const navigate = useNavigate();
    const  [loginDetails, setLoginDetails] =useState({userName: '', password: ''});
    const [userData, setUserData] = useState({});

function getUserName(userName){
    const data = [];
     fetch(`http://localhost:8080/api/usersByUserName/${userName}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
            data.push(result);
           setUserData(result);
        })
        .catch(console.log);
        return userData;
}

function handleLogin(){
    const {userName, password} = loginDetails;
    const userDetails = getUserName(userName);
    console.log('name', userDetails);
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
<div>
    <label><h3>User Login Form</h3></label>
    <form id= "loginForm">
    <ul>
            <label htmlFor="userName">User Name: </label>
            <input
              placeholder="Enter User Name "
              id="userName"
              name="userName"
              onChange={(event)=>{handleOnChange('userName', event.target.value)}}
            />
          </ul>
          <ul>
            <label htmlFor="lastName">Last Name: </label>
            <input
            type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
              onChange={(event)=>{handleOnChange('password', event.target.value)}}
            />
          </ul>
    </form>
<div><button onClick={handleLogin}>Login</button></div>
<div><button>Sign Up</button></div>
</div>
    )
}