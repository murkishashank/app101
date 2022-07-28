import { NavBar } from "./NavBar"
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';


export const AdminNavBar = () => {
    return(
        <NavBar>
            <button to="/admin" style={{ marginTop: 100}} >Link</button>
        </NavBar>
    );
}