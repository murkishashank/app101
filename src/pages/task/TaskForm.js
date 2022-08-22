import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAllUserIds } from "../../api/getAllUserIds";
import { taskStatusOptions } from "./TaskColDefs";

export const TaskForm = (props) => {
  let taskFormData = props.taskObj;
  const [userNames, setUserNames] = useState([]);

  const handleOnChange = (event) => {
    if (event.target.name === "userName") {
      const selectedUser = userNames.filter((record) => {
        return record.userName === event.target.value;
      });
      props.userID(selectedUser[0].id);
    }
    props.onChange(event);
  };

  const handleSubmit = () => {
    props.onSubmit();
  };

  const fetchUserName = () => {
    getAllUserIds().then((data) => {
      setUserNames(data);
    });
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton variant="primary">
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User Name</Form.Label>
            <Form.Select
              onChange={handleOnChange}
              name="userName"
              defaultValue={taskFormData.userName}
            >
              <option></option>
              {userNames.map((option, index) => {
                return <option> {option.userName}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="string"
              name="taskName"
              placeholder="Task Name"
              onChange={handleOnChange}
              defaultValue={taskFormData.taskName}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="String"
              placeholder="Task Description"
              name="taskDescription"
              onChange={handleOnChange}
              defaultValue={taskFormData.taskDescription}
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Task Status</Form.Label>
            <Form.Select
              onChange={handleOnChange}
              name="taskStatus"
              defaultValue={taskFormData.taskStatus}
            >
              <option></option>
              {taskStatusOptions.map((option) => {
                return <option> {option}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assigned Date</Form.Label>
            <Form.Control
              type="date"
              name="taskAssignedDate"
              placeholder="Assigned Date"
              defaultValue={taskFormData.taskAssignedDate}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
