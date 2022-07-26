import { Route, Routes } from "react-router-dom";
import { RegistrationForm } from "./RegistrationForm";
import { Users } from "./Users";
import { LoginForm } from "./LoginForm";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Home";
import { Leave } from "./Leave";
import { Profile } from "./Profile";
import { Admin } from "./Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route
          path="/registrationform/new"
          element={<RegistrationForm />}
        ></Route>
        <Route
          path="/registrationForm/:userId"
          element={<RegistrationForm />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
