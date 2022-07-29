import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { LoginUserDetailContext } from "../UserContext/LoginUserDetailContext";
export const NavBar = () => {
  const designation = localStorage.getItem("designation");
  return (
    <Navbar className="navbar navbar-light">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ float: "right" }}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/leave">
              Leave
            </Nav.Link> */}
            <Nav.Link as={Link} to="/profile">
              profile
            </Nav.Link>
            {designation === "Manager" && (
              <Nav.Link as={Link} to="/admin">
                <b>
                  <h5>LeaveManagement</h5>
                </b>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
