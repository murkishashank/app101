import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const userId = localStorage.getItem("userID");
  const designation = localStorage.getItem("designation");
  const navigate = useNavigate();
  useEffect(() => {
    if (userId === null || userId === "") {
      navigate("/")
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("designation", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("userName", "");
  }
  return (
    <Navbar
      className="navbar navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <div style={{ marginTop: "-7px" }}>
            <Image src={"../Tecnics.png"} height="30"></Image>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ float: "right" }}>
          <Nav className="me-auto">
            {designation === "null" ? (
              <>
                <Nav.Link as={Link} to="/home">
                  <b>
                    <h5>Home</h5>
                  </b>
                </Nav.Link>
                <Nav.Link as={Link} to="/workstatus">
                  <b>
                    <h5>Work Status</h5>
                  </b>
                </Nav.Link>
              </>
            ) : designation === "Manager" ? (
              <>
                <Nav.Link as={Link} to="/admin/leavemanagement">
                  <b>
                    <h5>Leave Management</h5>
                  </b>
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/taskform">
                  <b>
                    <h5>Work</h5>
                  </b>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/home">
                  <b>
                    <h5>Home</h5>
                  </b>
                </Nav.Link>
                <Nav.Link as={Link} to="/hr/leavesdata">
                  <b>
                    <h5>Leaves data</h5>
                  </b>
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/profile">
              <b>
                <h5>Profile</h5>
              </b>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/">
          <Button onClick={handleLogout}>
            <Image
              src="../check-out.png"
              style={{ width: "40px", height: "40px" }}
            ></Image>
          </Button>
        </Nav.Link>
      </Container>
    </Navbar>
  );
};
