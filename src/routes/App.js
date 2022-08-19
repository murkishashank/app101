import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";
import { RegistrationForm } from "../pages/RegistrationForm";
import { LoginForm } from "../pages/LoginForm/LoginForm";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Holidays } from "../pages/Holiday/Holidays";
import { GenerateHolidays } from "../pages/Holiday/GenerateHolidays";
import { Task } from "../components/Task";
import { Admin } from "../pages/LeaveManagement/Admin";
import { LoginUserDetailsProvider } from "../UserContext/LoginUserDetailContext";
import { PreviousApplications } from "../pages/LeaveManagement/PreviousApplications";
import { WorkStatus } from "../pages/WorkStatus/WorkStatus";
import { HumanResource } from "../pages/HumanResource/HumanResource";
import { ManageEmpDetails } from "../pages/ManageEmpDetails/ManageEmpDetails";
import { Feedback } from "../pages/feedback";
import { Payslip } from "../pages/payslip";
import { ManageSalaries } from "../pages/payslip/ManageSalaries";

function App() {
  const [userData, setUserData] = useState({});
  const [processedPeople, setProcessedPeople] = useState([]);
  const [empDetailsEdit, setEmpDetailsEdit] = useState({});

  function handlePrevoiusAppl(data) {
    const { processedPeople } = data;
    setProcessedPeople(processedPeople);
  }

  function handleEmpEditDetails(data) {
    setEmpDetailsEdit(data);
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
        <Route path="/work-status" element={<WorkStatus />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/payslip" element={<Payslip></Payslip>} />

        {/* Admin Routes */}

        <Route
          path="/admin/leave-management"
          element={<Admin processedPeople={handlePrevoiusAppl} />}
        />
        <Route
          path="/admin/previous-applications"
          element={<PreviousApplications processedPeople={processedPeople} />}
        />
        <Route path="/hr/leaves-data" element={<HumanResource />} />
        <Route
          path="/admin"
          element={<Admin prevoiusAppl={handlePrevoiusAppl} />}
        />
        {/* <Route path="/editProfile" element={<EditProfile userData={userData} />} /> */}
        <Route path="/work-status" element={<WorkStatus />} />
        <Route path="/admin/task" element={<Task />} />
        <Route path="/holidays" element={<Holidays userData={userData} />} />
        <Route
          path="/addHolidays"
          element={<GenerateHolidays userData={userData} />}
        />
        {/* HR Routes */}
        <Route
          path="/emp-details"
          element={
            <ManageEmpDetails setEditEmpDetails={handleEmpEditDetails} />
          }
        />
        <Route path="/manage-salaries" element={<ManageSalaries />} />
        <Route
          path="/edit-emp-details"
          element={<Profile editEmp={empDetailsEdit} />}
        />
      </Routes>
    </LoginUserDetailsProvider>
  );
}

export default App;
