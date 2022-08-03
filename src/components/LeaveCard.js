import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../css/CommonStyling.css";

export const LeaveCard = (props) => {
  const leaveData = props.leaveData;
  let status;
  let remarks;
  leaveData.approvedFlag === "Rejected"
    ? (status = "Rejected")
    : leaveData.approvedFlag === ""
    ? (status = "Pending")
    : (status = "Approved");

  leaveData.remarks === null ? remarks = "No comments yet." : remarks = leaveData.remarks;

  const handleOnClick = () => {
    props.onEdit(props.index);
  };

  return (
    <Card style={{ width: "50rem", height: "auto" }}>
      <Card.Body>
        <Card.Title>{leaveData.reason}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {leaveData.AppliedOn}
        </Card.Subtitle>
        {leaveData.approvedFlag !== "" ? (
          <Button variant="secondary" className="editbtn" disabled>
            Edit
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="editbtn"
            onClick={handleOnClick}
          >
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
        <Card.Text>Remarks: {remarks}</Card.Text>
      </Card.Body>
    </Card>
  );
};
