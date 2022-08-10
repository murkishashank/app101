import { borderRightColor } from "@mui/system";
import { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackRecords } from "../../api/getAllFeedbackRecords";
import { saveFeedbackComment } from "../../api/postFeedbackComment";
import { NavBar } from "../../components/NavBar";
import { useFeedbackSlice } from "./slice/actions";
import { selectEmpFeedback, selectFeedbackRecords } from "./slice/selector";

export const arrow = {
  width: "12px",
  height: "20px",
  overflow: "hidden",
  position: "relative",
  float: "left",
  top: "6px",
  right: "-1px",
};
export const arrowOuter = {
  width: 0,
  height: 0,
  borderRight: "20px",
  borderRadius: "90px",
  borderRightColor: "#ffffff",
  borderTop: "10px ",
  borderBottom: "10px ",
  position: "absolute",
  top: 0,
  left: 0,
};
export const arrowInner = {
  width: 0,
  height: 0,
  borderRight: "20px ",
  borderRadius: "90px",
  borderRightColor: "#ffffff",
  borderTop: "10px",
  borderBottom: "10px ",
  position: "absolute",
  top: 0,
  left: "2px",
};
export const Feedback = () => {
  const userId = localStorage.getItem("userID");
  const allFeedbacks = useSelector(selectFeedbackRecords);
  const empFeedback = useSelector(selectEmpFeedback);
  const { actions } = useFeedbackSlice();
  const dispatch = useDispatch();
  const recordsLength = allFeedbacks.length ?? 0;
  useEffect(() => {
    getAllFeedbackRecords();
  }, []);

  const getAllFeedbackRecords = () => {
    getFeedbackRecords().then((data) => {
      dispatch(actions.loadFeedbackRecords(data));
    });
  };

  const handleOnChange = (value) => {
    dispatch(
      actions.updateEmployeeCommentRecord({
        userId: userId,
        comment: value,
        commentedDate: new Date(),
      })
    );
  };

  const handleSubmit = () => {
    if (empFeedback.comment !== "") {
      saveFeedbackComment(empFeedback).then((data) => {
        if (data.id) {
          alert("Comment submitted successfully.");
          getAllFeedbackRecords();
          dispatch(actions.setEmployeeRecordToInitialState());
        } else {
          alert("Error while submitting the comment");
        }
      });
    } else {
      alert(
        "PLease enter the comment in comment box before hit the submit button."
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          padding: "30px",
          marginLeft: "220px",
          width: "900px",
          height: "inherit",
        }}
      >
        <Card>
          <Card.Header>Feedback</Card.Header>
          <Card.Text>We thank everyone for using "My Portal".</Card.Text>
          <Card.Text>
            It is our constant endeavor to improve "My Portal" content &
            features so that everyone is benefited and is productive.
            Understanding your expectations is very important for us. Please
            submit your valuable feedback below and tell us about your views,
            comments, suggestions & complaints and we promise you a better
            portal in the coming months.
          </Card.Text>
          <div style={{ marginLeft: "100px", width: "643px", padding: "30px" }}>
            <Form.Label>Enter your comments: </Form.Label>
            <Form.Control
              as="textarea"
              value={empFeedback.comment}
              onChange={(event) => {
                handleOnChange(event.target.value);
              }}
            />

            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="danger" onClick={handleSubmit}>
                Submit feedback
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div
        style={{
          marginTop: "30px",
          marginLeft: "220px",
          width: "900px",
          height: "inherit",
        }}
      >
        <div>Comments: {recordsLength}</div>
        {allFeedbacks.map((record) => {
          const {
            comment,
            commentedDate,
            userName: { userName },
          } = record;
          return (
            <div>
              <div style={arrow}>
                <div style={arrowOuter}></div>
                <div style={arrowInner}></div>
              </div>
              <div
                className="message_box"
                style={{
                  backgroundColor: "#eceff1",
                  padding: "20px",
                  borderRadius: "7px",
                  borderStyle: "groove",
                }}
              >
                <Form.Group>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {commentedDate}
                  </div>
                  <Form.Label>Name: {userName}</Form.Label>
                  <br />
                  <Form.Label>Comment: {comment}</Form.Label>
                </Form.Group>
                <br />
                {/* <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {commentedDate}
                </div>
                <Card.Text> Name: {userName}</Card.Text>
                <Card.Text>Comment: {comment}</Card.Text>
              </Card> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
