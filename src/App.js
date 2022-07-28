import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Home";
import { Leave } from "./Leave";
import { Profile } from "./Profile";
import { Admin } from "./Admin";
import { Users } from "./Users";
import { LoginUserDetailsProvider } from "./UserContext/LoginUserDetailContext";
import { PreviousApplications } from "./PreviousApplications";
function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [approvedPeople, setApprovedPeople] = useState([]);
  const [deniedPeople, setDeniedPeople] = useState([]);
  
  function handlePrevoiusAppl(data){
    const {approvedPeople, deniedPeople} = data;
    setApprovedPeople(approvedPeople);
    setDeniedPeople(deniedPeople);
  }

  function handleLoginUserDetails(userDetails) {
    localStorage.setItem("designation", userDetails.designation);
    setUserData(userDetails);
  }



  return (
    <>
      <LoginUserDetailsProvider value={userData}>
        <Routes>
          <Route
            path="/"
            element={<LoginForm loginUserDetails={handleLoginUserDetails} />}
          ></Route>
          <Route
            path="/registrationform/new"
            element={<RegistrationForm />}
          ></Route>
          <Route
            path="/registrationForm/:userId"
            element={<RegistrationForm />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/leave" element={<Leave userData={userData} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin prevoiusAppl= {handlePrevoiusAppl} />} />
          <Route path="/previousApplications" element={<PreviousApplications approvedpeople={approvedPeople} deniedpeople={deniedPeople}/>} />
        </Routes>
      </LoginUserDetailsProvider>
    </>
  );
}

export default App;
