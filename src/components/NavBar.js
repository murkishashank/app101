import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../assets/images/tecnics.png";

export const NavBar = () => {
  const userId = localStorage.getItem("userID");
  const designation = localStorage.getItem("designation");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  useEffect(() => {
    if (userId === null || userId === "") {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.setItem("designation", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("userName", "");
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={RouterLink}
            to="/home"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img alt="tecnics-logo" height={50} src={logo} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {designation === "Intern" || designation === "Associate" ? (
                <span>
                  <MenuItem
                    component={RouterLink}
                    to="/work-status"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    Work Status
                  </MenuItem>
                </span>
              ) : designation === "Manager" ? (
                <span>
                  <MenuItem
                    component={RouterLink}
                    to="/admin/leave-management"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    Leave Management
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/admin/task"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    Work
                  </MenuItem>
                </span>
              ) : (
                <span>
                  <MenuItem
                    component={RouterLink}
                    to="/hr/leaves-data"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    Leaves
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/emp-details"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    Employees
                  </MenuItem>
                </span>
              )}
              <MenuItem
                component={RouterLink}
                to="/holidays"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Holidays
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/feedback"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Feedback
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/payslip"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Payslip
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/schedule"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Schedule
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/self-appraisal-form"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                Self-Appraisal
              </MenuItem>
            </Menu>
          </Box>
          <Box
            component={RouterLink}
            to="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img alt="tecnics-logo" height={50} src={logo} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {designation === "null" ? (
              <>
                {/* <Button
                  component={RouterLink}
                  to="/home"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Home
                </Button> */}
                <Button
                  component={RouterLink}
                  to="/work-status"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Work Status
                </Button>
              </>
            ) : designation === "Manager" ? (
              <>
                <Button
                  component={RouterLink}
                  to="/admin/leave-management"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Leave Management
                </Button>
                <Button
                  component={RouterLink}
                  to="/admin/task"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Work
                </Button>
              </>
            ) : (
              <>
                {/* <Button
                  component={RouterLink}
                  to="/home"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Home
                </Button> */}
                <Button
                  component={RouterLink}
                  to="/hr/leaves-data"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Leaves
                </Button>
                <Button
                  component={RouterLink}
                  to="/emp-details"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  Employees
                </Button>
              </>
            )}
            <Button
              component={RouterLink}
              to="/holidays"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              Holidays
            </Button>
            <Button
              component={RouterLink}
              to="/feedback"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              Feedback
            </Button>
            <Button
              component={RouterLink}
              to="/payslip"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              Payslip
            </Button>
            <Button
              component={RouterLink}
              to="/schedule"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              Schedule
            </Button>
            <Button
              component={RouterLink}
              to="/self-appraisal-form"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              Self-Appraisal
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={userName}
                  src="https://mui.com/static/images/avatar/4.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={RouterLink}
                to="/profile"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem component={RouterLink} to="/" onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
