import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const userId = localStorage.getItem("userID");
  const designation = localStorage.getItem("designation");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  useEffect(() => {
    if (userId === null || userId === "") {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("designation", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("userName", "");
  };
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
                <Nav.Link as={Link} to="/work-status">
                  <b>
                    <h5>Work Status</h5>
                  </b>
                </Nav.Link>
              </>
            ) : designation === "Manager" ? (
              <>
                <Nav.Link as={Link} to="/admin/leave-management">
                  <b>
                    <h5>Leave Management</h5>
                  </b>
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/task">
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
                <Nav.Link as={Link} to="/hr/leaves-data">
                  <b>
                    <h5>Leaves data</h5>
                  </b>
                </Nav.Link>
                <Nav.Link as={Link} to="/emp-details">
                  <b>
                    <h5>Manage Employee Details</h5>
                  </b>
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/profile">
              <b>
                <h5>Profile</h5>
              </b>
            </Nav.Link>
            <Nav.Link as={Link} to="/feedback">
              <b>
                <h5>Feedback</h5>
              </b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/">
          <Button variant="outline-dark" onClick={handleLogout}>
            <b>{userName} </b>
            <Image
              src="../check-out.png"
              style={{ width: "50px", height: "30px" }}
            ></Image>
          </Button>
        </Nav.Link>
      </Container>
    </Navbar>
  );
};
