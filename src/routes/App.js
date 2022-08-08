import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import { RegistrationForm } from "../pages/RegistrationForm";
import { LoginForm } from "../pages/LoginForm/LoginForm";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Task } from "../components/Task";
import { Admin } from "../pages/LeaveManagement/Admin";
import { LoginUserDetailsProvider } from "../UserContext/LoginUserDetailContext";
import { PreviousApplications } from "../pages/LeaveManagement/PreviousApplications";
import { WorkStatus } from "../pages/WorkStatus/WorkStatus";
import { HumanResource } from "../pages/HumanResource/HumanResource";

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
    localStorage.setItem("userName", userDetails.userName);
    setUserData(userDetails);
  }

  return (
    <LoginUserDetailsProvider value={userData}>
      <Routes>
        {/* Main Routes */}
        <Route
          path="/"
          element={<LoginForm loginUserDetails={handleLoginUserDetails} />}
        ></Route>
        <Route
          path="/registrationform/new"
          element={<RegistrationForm />}
        ></Route>
        <Route
          path="/registrationform/:userId"
          element={<RegistrationForm />}
        />

        {/* User Routes */}
        
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile userData={userData} />} />
        <Route path="/workstatus" element={<WorkStatus />} />

        {/* Admin Routes */}
        
        <Route
          path="/admin/leavemanagement"
          element={<Admin processedPeople={handlePrevoiusAppl} />}
        />
        <Route
          path="/admin/previousapplications"
          element={<PreviousApplications processedPeople={processedPeople} />}
        />
        <Route path="/admin/taskform" element={<Task />} />

        {/* HR Routes */}
        <Route path="/hr/leavesdata" element={<HumanResource />} />
      </Routes>
    </LoginUserDetailsProvider>
  );
}

export default App;
