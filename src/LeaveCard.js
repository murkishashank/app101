import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CommonStyling.css";

export const LeaveCard = (props) => {
  const leaveData = props.leaveData;
  let status;
  leaveData.approvedFlag === "Rejected"
    ? (status = "Rejected")
    : leaveData.approvedFlag === ""
      ? (status = "Pending")
      : (status = "Approved");

  const handleOnClick = () => {
    props.onEdit(props.index)
  }

  return (
    <Card style={{ width: "50rem", height: "auto" }}>
      <Card.Body>
        <Card.Title>{leaveData.reason}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {leaveData.AppliedOn}
        </Card.Subtitle>
        {leaveData.approvedFlag !== "" ? (
          <Button className="editbtn" disabled>
            Edit
          </Button>
        ) : (
          <Button className="editbtn" onClick={handleOnClick}>
            Edit
          </Button>
        )}
        <Card.Subtitle className="mb-2 text-muted">
          From: {leaveData.fromDate}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          To: {leaveData.toDate}
        </Card.Subtitle>
        <Card.Text>Status: {status}</Card.Text>
        <Card.Text>Remarks: {leaveData.remarks}</Card.Text>
      </Card.Body>
    </Card>
  );
};
