import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import "../css/App.css";
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
import { NavBar } from "../components/NavBar";
import { Box } from "@mui/material";

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

  function WithAppBar(props) {
    return (
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <NavBar />
        {props.children}
      </Box>
    );
  }

  return (
    <LoginUserDetailsProvider value={userData}>
      <Routes>
        {/* Main Routes */}
        <Route
          path="/"
          element={<LoginForm loginUserDetails={handleLoginUserDetails} />}
        />
        <Route path="/registrationform/new" element={<RegistrationForm />} />
        <Route
          path="/registrationform/:userId"
          element={<RegistrationForm />}
        />
      </Routes>
      <Routes>
        {/* User Routes */}
        <Route
          index
          path="/home"
          element={
            <WithAppBar>
              <Home />
            </WithAppBar>
          }
        />
        <Route
          path="/profile"
          element={
            <WithAppBar>
              <Profile userData={userData} />
            </WithAppBar>
          }
        />
        <Route
          path="/work-status"
          element={
            <WithAppBar>
              <WorkStatus />
            </WithAppBar>
          }
        />
        <Route
          path="/feedback"
          element={
            <WithAppBar>
              <Feedback />
            </WithAppBar>
          }
        />
        <Route
          path="/payslip"
          element={
            <WithAppBar>
              <Payslip></Payslip>
            </WithAppBar>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin/leave-management"
          element={
            <WithAppBar>
              <Admin processedPeople={handlePrevoiusAppl} />
            </WithAppBar>
          }
        />
        <Route
          path="/admin/previous-applications"
          element={
            <WithAppBar>
              <PreviousApplications processedPeople={processedPeople} />
            </WithAppBar>
          }
        />
        <Route
          path="/hr/leaves-data"
          element={
            <WithAppBar>
              <HumanResource />
            </WithAppBar>
          }
        />
        <Route
          path="/admin"
          element={
            <WithAppBar>
              <Admin prevoiusAppl={handlePrevoiusAppl} />
            </WithAppBar>
          }
        />
        <Route
          path="/work-status"
          element={
            <WithAppBar>
              <WorkStatus />
            </WithAppBar>
          }
        />
        <Route
          path="/admin/task"
          element={
            <WithAppBar>
              <Task />
            </WithAppBar>
          }
        />
        <Route
          path="/holidays"
          element={
            <WithAppBar>
              <Holidays userData={userData} />
            </WithAppBar>
          }
        />
        <Route
          path="/addHolidays"
          element={
            <WithAppBar>
              <GenerateHolidays userData={userData} />
            </WithAppBar>
          }
        />
        {/* HR Routes */}
        <Route
          path="/emp-details"
          element={
            <WithAppBar>
              {" "}
              <ManageEmpDetails setEditEmpDetails={handleEmpEditDetails} />
            </WithAppBar>
          }
        />
        <Route
          path="/edit-emp-details"
          element={
            <WithAppBar>
              <Profile editEmp={empDetailsEdit} />
            </WithAppBar>
          }
        />
      </Routes>
    </LoginUserDetailsProvider>
  );
}

export default App;
