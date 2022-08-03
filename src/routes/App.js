import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import { RegistrationForm } from "../pages/RegistrationForm";
import { LoginForm } from "../pages/LoginForm";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
// import { WorkStatus } from "../pages/WorkStatus";
import { Task } from "../components/Task";
import { Admin } from "../pages/LeaveManagement/Admin";
// import { Admin } from ".../pages/LeaveManagement/Admin";
import { Users } from "../pages/Users";
import { LoginUserDetailsProvider } from "../UserContext/LoginUserDetailContext";
import { PreviousApplications } from "../pages/LeaveManagement/PreviousApplications";
import { WorkStatus } from "../pages/WorkStatus/WorkStatus";
import { NavBar } from "../components/NavBar";

function App() {
  const [userData, setUserData] = useState({});
  const [approvedPeople, setApprovedPeople] = useState([]);
  const [deniedPeople, setDeniedPeople] = useState([]);

  function handlePrevoiusAppl(data) {
    const { approvedPeople, deniedPeople } = data;
    setApprovedPeople(approvedPeople);
    setDeniedPeople(deniedPeople);
  }

  function handleLoginUserDetails(userDetails) {
    localStorage.setItem("designation", userDetails.designation);
    localStorage.setItem("userID", userDetails.id);
    localStorage.setItem("userName", userDetails.userName);
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
          <Route
            path="/previousApplications"
            element={
              <PreviousApplications
                approvedpeople={approvedPeople}
                deniedpeople={deniedPeople}
              />
            }
          />
          <Route
            path="/previousApplications"
            element={
              <PreviousApplications
                approvedpeople={approvedPeople}
                deniedpeople={deniedPeople}
              />
            }
          />
          <Route path="/workStatus" element={<WorkStatus></WorkStatus>} />
          <Route
            path="/admin"
            element={<Admin prevoiusAppl={handlePrevoiusAppl} />}
          />
          {/* <Route path="/editProfile" element={<EditProfile userData={userData} />} /> */}
          <Route path="/workStatus" element={<WorkStatus />} />
          <Route path="/taskForm" element={<Task />} />

          {/* <Route path="/previousApplications" element={<PreviousApplications approvedpeople={approvedPeople} deniedpeople={deniedPeople} />} /> */}
        </Routes>
      </LoginUserDetailsProvider>
    </>
  );
}

export default App;
