import React, { useState, useEffect } from "react";
import { TextField, Container, Typography, Button } from "@mui/material";
import Pdf from "react-to-pdf";
import { NavBar } from "../components/NavBar";
import { getUser } from "../api/getUserByUserName";
import { postSelfAppraisal } from "../api/postSelfAppraisal";

export const SelfAppraisalForm = () => {
  const [userData, setUserData] = useState({});
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userID");
  const [initialState, setData] = useState({ userId: userId });
  const ref = React.createRef();

  useEffect(() => {
    const user = getUser(userName);
    user.then((data) => {
      setUserData(data);
    });
  }, []);

  const { mobileNumber, emailId, reportingManager, joiningDate, designation } =
    userData;

  const handleOnChange = (e) => {
    let result =
      typeof e.target.value === "string" ? e.target.value.split("\n") : "";
    const user = { ...initialState, [e.target.name]: result };
    setData(user);
  };

  const handleOnSubmit = () => {
    const saveData = postSelfAppraisal(initialState);
    saveData.then((response) => {
      if (response) {
        console.log(response);
        alert("saved successful");
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <NavBar></NavBar>
      <Container
        ref={ref}
        maxWidth="md"
        style={{
          backgroundColor: "white",
          border: "groove",
          borderColor: "blue",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h5" gutterBottom component="div">
          Employee Self-Appraisal Form
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="h3"
          style={{
            backgroundColor: "blue",
            fontWeight: "bold",
            color: "white",
          }}
        >
          # Section1: Appraisal Information
        </Typography>
        <div
          component="form"
          sx={{
            backgroundColor: "#eee",
            margin: "10px",
            padding: "20px",
            border: "ridge",
          }}
        >
          <TextField
            margin="normal"
            id="outlined-name"
            label="Name"
            value={userName}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
          <TextField
            margin="normal"
            id="outlined-designation"
            label="Designation"
            defaultValue="Associate Software Engineer"
            value={designation}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            id="outlined-date"
            label="Joining Date"
            defaultValue="2021-09-13"
            value={joiningDate}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            id="outlined-text"
            label="Reporting Manager"
            defaultValue="Sandeep"
            value={reportingManager}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            id="outlined-number"
            label="Email"
            defaultValue="xyz@tecnics.com"
            value={emailId}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            id="outlined-number"
            label="Mobile Number"
            defaultValue="7765432467"
            value={mobileNumber}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="h3"
          style={{
            backgroundColor: "blue",
            fontWeight: "bold",
            color: "white",
          }}
        >
          # Section2: My Job Accomplishments since last review
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="h3">
          Please Attach additional sheets if necessary when answering the
          following questions;
        </Typography>
        <div>
          <Typography variant="subtitle2" gutterBottom component="h3">
            1. What were you major achievements in the past year? (Max 5 items
            only)
          </Typography>
          <TextField
            margin="normal"
            id="outlined-textarea"
            placeholder="Placeholder"
            variant="filled"
            multiline
            name="accomplishment"
            rows={5}
            fullWidth
            onChange={handleOnChange}
          />
          <Typography variant="subtitle2" gutterBottom component="h3">
            2. Projects Worked on, Client Presentations, Sales Proposals
            submitted, etc. (Max 5 items only)
          </Typography>
          <TextField
            margin="normal"
            id="outlined-textarea"
            placeholder="Placeholder"
            variant="filled"
            multiline
            name="project"
            rows={5}
            fullWidth
            onChange={handleOnChange}
          />
          <Typography variant="subtitle2" gutterBottom component="h3">
            3. Trainings/Workshops conducted/attended, Awards/certificates
            Received, Team building Activities, etc.(Max 5 items only)
          </Typography>
          <TextField
            margin="normal"
            id="outlined-textarea"
            placeholder="Placeholder"
            variant="filled"
            multiline
            name="goal"
            rows={5}
            fullWidth
            onChange={handleOnChange}
          />
          <Typography variant="subtitle2" gutterBottom component="h3">
            4. Issues faced & Suggestions for improvement (Max 5 items only)
          </Typography>
          <TextField
            margin="normal"
            id="outlined-textarea"
            placeholder="Placeholder"
            variant="filled"
            multiline
            rows={5}
            name="workshop"
            fullWidth
            onChange={handleOnChange}
          />
          <Typography variant="subtitle2" gutterBottom component="h3">
            5. What goals (specific measurable results) do you expect to
            accomplish during the next year? (Max 5 items only)
          </Typography>
          <TextField
            margin="normal"
            id="outlined-textarea"
            placeholder="Placeholder"
            variant="filled"
            multiline
            name="issue"
            rows={5}
            fullWidth
            onChange={handleOnChange}
          />
        </div>
        <Button
          variant="contained"
          style={{ marginBottom: "10px", marginTop: "10px" }}
          onClick={handleOnSubmit}
        >
          Submit
        </Button>
        <Pdf targetRef={ref} filename="self-appraisal-form.pdf">
          {({ toPdf }) => (
            <Button className="ms-1" variant="outlined" onClick={toPdf}>
              Generate Pdf
            </Button>
          )}
        </Pdf>
      </Container>
    </div>
  );
};
