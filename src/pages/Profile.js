import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postUser } from "../api/postUser";
import { getUser } from "../api/getUserByUserName";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";

import { EditProfileComponent } from "../components/EditProfileComponent";
import { employeeRoles } from "./ManageEmpDetails/coldefs";
import { getFinancialDetails } from "../api/payslip/getFinanciaDetails";
import { saveFinancialRecord } from "../api/payslip/postFinancialDetails";
import { set } from "date-fns";

export const Profile = (props) => {
  const [userData, setUserData] = useState({});
  const hrEditMode = props?.editEmp?.id ? false : true;
  const navigate = useNavigate();
  const [financialDetails, setFinancialDetails] = useState({});
  const [show, setShow] = useState(false);
  const [financialDetailsEditStatus, setFinancialDetailsEditStatus] =
    useState(true);

  useEffect(() => {
    if (props.editEmp) {
      setUserData(props.editEmp);
    } else {
      const user = getUser(props.userData.userName);
      user.then((data) => {
        setUserData(data);
      });
    }
  }, [props]);

  useEffect(() => {
    if (!financialDetails.length)
      getFinancialDetails(userData.id).then((data) => {
        setFinancialDetails(data[data.length - 1]);
        if (data[data.length - 1].accountNumber === null) {
          setFinancialDetailsEditStatus(false);
        }
      });
  }, [userData]);

  const {
    userName,
    firstName,
    lastName,
    dateOfBirth,
    mobileNumber,
    emailId,
    personalEmailId,
    alternativeMobileNumber,
    permanentAddress,
    contactAddress,
    reportingManager,
    joiningDate,
    designation,
  } = userData;

  const { accountNumber, bankIFSC, bankBranchName, panNumber } =
    financialDetails;

  const saveUser = () => {
    const saveUserInfo = postUser(userData);
    saveUserInfo.then((response) => {
      if (response) {
        alert("User updated successfully");
        navigate("/emp-details");
      }
    });
  };

  const handleOnChange = (key, value) => {
    const userDataClone = { ...userData, [key]: value };
    setUserData(userDataClone);
  };

  const handleFinancialDetailsOnChange = (key, value) => {
    const financialDetailsClone = { ...financialDetails, [key]: value };
    setFinancialDetails(financialDetailsClone);
  };

  const handleFinancialDetailsSave = () => {
    saveFinancialRecord(financialDetails).then((response) => {
      response.id
        ? alert("Financial Details are updated successfully.")
        : alert("Error while updating the financial details");
    });
    setFinancialDetailsEditStatus(true);
  };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <Container className="py-3">
        <Form
          as={Row}
          className="mb-4 p-2"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "55rem",
          }}
        >
          <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>
            Personal Details
          </Form.Label>
          <Col sm={3} className="text-center">
            <Image
              alt="avatar"
              className="rounded-circle"
              src="../image.jpg"
              style={{ width: "150px" }}
              fluid
            />
            <Form.Label className="d-flex justify-content-center mt-2">
              {userName}
            </Form.Label>
            {hrEditMode === true && (
              <Button
                variant="outline-primary"
                className="ms-1"
                onClick={() => setShow(true)}
              >
                Request Edit
              </Button>
            )}
            {hrEditMode === false && (
              <>
                <Button
                  variant="outline-primary"
                  className="ms-1"
                  onClick={saveUser}
                >
                  Save
                </Button>
              </>
            )}
            <EditProfileComponent
              show={show}
              userData={userData}
              onHide={() => {
                setShow(false);
              }}
            ></EditProfileComponent>
          </Col>
          <Col sm={9}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalFirstName"
            >
              <Form.Label column sm={3}>
                First Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="firstName"
                  value={firstName}
                  readOnly={hrEditMode}
                  onChange={(event) =>
                    handleOnChange("firstName", event.target.value)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGroupLastName">
              <Form.Label column sm={3}>
                Last Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="lastName"
                  value={lastName}
                  readOnly={hrEditMode}
                  onChange={(event) =>
                    handleOnChange("lastName", event.target.value)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGroupAge">
              <Form.Label column sm={3}>
                DOB{" "}
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  value={dateOfBirth}
                  readOnly={hrEditMode}
                  onChange={(event) =>
                    handleOnChange("dateOfBirth", event.target.value)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formGroupPersonalEmail"
            >
              <Form.Label column sm={3}>
                Personal Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  value={personalEmailId}
                  readOnly={hrEditMode}
                  onChange={(event) =>
                    handleOnChange("personalEmailId", event.target.value)
                  }
                />
              </Col>
            </Form.Group>
          </Col>
        </Form>
        <Form
          as={Row}
          className="mb-4 p-2"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "55rem",
          }}
        >
          <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>
            Contact Details
          </Form.Label>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formGroupPermanentAddress"
          >
            <Form.Label column sm={4}>
              Permanent Address
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                as={"textarea"}
                rows={5}
                type="address"
                value={permanentAddress}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formGroupPersonalEmail"
          >
            <Form.Label column sm={4}>
              Contact Address
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                as={"textarea"}
                rows={5}
                type="address"
                value={contactAddress}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="horizontalFormMobileNumber"
          >
            <Form.Label column sm={4}>
              Mobile Number
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                value={mobileNumber}
                readOnly={hrEditMode}
                onChange={(event) =>
                  handleOnChange("mobileNumber", event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="horizontalFormNumber"
          >
            <Form.Label column sm={4}>
              Alternative Mobile Number
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                value={alternativeMobileNumber}
                readOnly={hrEditMode}
                onChange={(event) =>
                  handleOnChange("alternativeMobileNumber", event.target.value)
                }
              />
            </Col>
          </Form.Group>
        </Form>
        <Form
          as={Row}
          className="mb-4 p-2"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "55rem",
          }}
        >
          <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>
            Employee Details
          </Form.Label>
          <Form.Group as={Row} className="mb-3" controlId="formGroupJoinDate">
            <Form.Label column sm={4}>
              Joining Date
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="date"
                value={joiningDate}
                readOnly={hrEditMode}
                onChange={(event) =>
                  handleOnChange("joiningDate", event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGroupName">
            <Form.Label column sm={4}>
              Reporting Manager
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={reportingManager}
                readOnly={hrEditMode}
                onChange={(event) =>
                  handleOnChange("reportingManager", event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formGroupDesignation"
          >
            <Form.Label column sm={4}>
              Designation
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                type="text"
                value={designation}
                disabled={hrEditMode}
                onChange={(event) =>
                  handleOnChange("designation", event.target.value)
                }
              >
                {employeeRoles.map((role) => {
                  return <option>{role}</option>;
                })}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
            <Form.Label column sm={4}>
              Email
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                value={emailId}
                readOnly={hrEditMode}
                onChange={(event) =>
                  handleOnChange("emailId", event.target.value)
                }
              />
            </Col>
          </Form.Group>
        </Form>
        -------------------------------------------------------------------------------------------------------------------------------------------
        <Form
          as={Row}
          className="mb-4 p-2"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "55rem",
          }}
        >
          <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>
            Financial Details
          </Form.Label>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formGroupAccountNumber"
          >
            <Form.Label column sm={4}>
              Account Number
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={accountNumber}
                readOnly={financialDetailsEditStatus}
                onChange={(event) =>
                  handleFinancialDetailsOnChange(
                    "accountNumber",
                    event.target.value
                  )
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGroupBankIFSC">
            <Form.Label column sm={4}>
              Bank IFSC
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={bankIFSC}
                readOnly={financialDetailsEditStatus}
                onChange={(event) =>
                  handleFinancialDetailsOnChange("bankIFSC", event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formGroupBankBranchName"
          >
            <Form.Label column sm={4}>
              Bank Branch Name
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={bankBranchName}
                readOnly={financialDetailsEditStatus}
                onChange={(event) =>
                  handleFinancialDetailsOnChange(
                    "bankBranchName",
                    event.target.value
                  )
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formGroupBankPanNumber"
          >
            <Form.Label column sm={4}>
              Pan Number
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={panNumber}
                readOnly={financialDetailsEditStatus}
                onChange={(event) =>
                  handleFinancialDetailsOnChange(
                    "panNumber",
                    event.target.value
                  )
                }
              />
            </Col>
          </Form.Group>
          {!financialDetailsEditStatus && (
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formGroupUpdateDetails"
            >
              <Col sm={8}>
                <MuiButton
                  variant="outlined"
                  onClick={handleFinancialDetailsSave}
                >
                  {" "}
                  Update Financial details
                </MuiButton>
              </Col>
            </Form.Group>
          )}
        </Form>
      </Container>
    </div>
  );
};
