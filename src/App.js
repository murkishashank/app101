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
import { EditProfile } from "./components/EditProfile";
import { LoginUserDetailsProvider } from "./UserContext/LoginUserDetailContext";
function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  function handleLoginUserDetails(userDetails) {
    setUserData(userDetails);
  }

  return (
    <>
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
        <Route path="/profile" element={<Profile userData={userData} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/editProfile" element={<EditProfile userData={userData} />} />
      </Routes>
    </>
  );
}

export default App;
