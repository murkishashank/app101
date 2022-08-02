import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import { RegistrationForm } from "../pages/RegistrationForm";
import { LoginForm } from "../pages/LoginForm";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
// import { WorkStatus } from "../pages/WorkStatus";
import {Task} from "../components/Task";
import { Admin } from "../pages/Admin";
import { Users } from "../pages/Users";
import { LoginUserDetailsProvider } from "../UserContext/LoginUserDetailContext";
import { PreviousApplications } from "../pages/PreviousApplications";
import { WorkStatus } from "../pages/WorkStatus/WorkStatus.js";

function App() {
  const [userData, setUserData] = useState({});
  const [processedPeople, setProcessedPeople] = useState([]);

  function handlePrevoiusAppl(data) {
    const { processedPeople } = data;
    setProcessedPeople(processedPeople);
  }

  function handleLoginUserDetails(userDetails) {
    localStorage.setItem("designation", userDetails.designation);
    localStorage.setItem("userID", userDetails.id);
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
          <Route path="/profile" element={<Profile userData={userData} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workStatus" element={<WorkStatus></WorkStatus>} />
          <Route
            path="/previousApplications"
            element={<PreviousApplications processedPeople={processedPeople} />}
          />
          <Route path="/workStatus" element={<WorkStatus></WorkStatus>} />
          <Route path="/admin" element={<Admin prevoiusAppl={handlePrevoiusAppl} />} />
          {/* <Route path="/editProfile" element={<EditProfile userData={userData} />} /> */}
          <Route path ="/workStatus" element = {<WorkStatus/>}/>
          <Route path = "/taskForm" element = {<Task/>}/>

          {/* <Route path="/previousApplications" element={<PreviousApplications approvedpeople={approvedPeople} deniedpeople={deniedPeople} />} /> */}
        </Routes>
      </LoginUserDetailsProvider>
    </>
  );
}

export default App;
