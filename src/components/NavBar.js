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
    <Navbar
      className="navbar navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <div style={{ marginTop: "-7px" }}>
            <img src={"../Tecnics.png"} height="30"></img>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ float: "right" }}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              <b>
                <h5>Home</h5>
              </b>
            </Nav.Link>
            <Nav.Link as={Link} to="/workStatus">
              <b>
                <h5>Work Status</h5>
              </b>
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <b>
                <h5>Profile</h5>
              </b>
            </Nav.Link>
            {designation === "Manager" && (
              <Nav.Link as={Link} to="/admin">
                <b>
                  <h5>Leave Management</h5>
                </b>
              </Nav.Link>
            )}
             {designation === "Manager" ? <Nav.Link as={Link} to="/taskForm">
             <b>
                  <h5>Work</h5>
                </b>
              </Nav.Link> : <Nav.Link as={Link} to="/workStatus">
              <b>
                  <h5>Work</h5>
                </b>
              </Nav.Link>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* <!--Avatar--> */}
      <Nav.Link as={Link} to="/profile">
        <img
          src="../image.jpg"
          class="rounded-circle"
          height="30"
          width="30"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
      </Nav.Link>
      {/* <!--Avatar--> */}
    </Navbar>
  );
};
