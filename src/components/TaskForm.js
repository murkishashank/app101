import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { getAllUserIds } from "../api/getAllUserIds";
import { taskStatusOptions} from "../components/TaskColDefs"


export const TaskForm = (props) => {
    let taskFormData = props.taskObj
    const [userNames, setUserNames] = useState([])
    const[userIds, setUserIds] = useState([]);

    const handleOnChange = (event) => {
        if(event.target.name === "userName") {
           let index = userNames.map((value, index) => {
            if(value === event.target.value) {
                return index;
            }
           }).filter(Boolean);
           let userId = userIds[index]
            props.userID(userId)
        }
        props.onChange(event);
    }

    const handleSubmit = () => {
        props.onSubmit();
    }
    const fetchUserName = () => {
        getAllUserIds().then((data) => {
            setUserIds(Object.keys(data))
            setUserNames(Object.values(data))
        });
      };

  
      useEffect(() => {
        fetchUserName();
      }, []);


    return <Modal
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
                <Form.Select onChange={handleOnChange} name='userName' defaultValue={taskFormData.userName} >
                        {userNames.map((option, index) => {
                            return(<option> {option}</option>)
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                        type="string"
                        name='taskName'
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
                        name='taskDescription'
                        onChange={handleOnChange}
                        defaultValue={taskFormData.taskDescription}
                        autoFocus
                        required
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Task Status</Form.Label>
                    <Form.Select onChange={handleOnChange} name='taskStatus' defaultValue={taskFormData.taskStatus} >
                        {taskStatusOptions.map(option => {
                            return(<option> {option}</option>)
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assigned By</Form.Label>
            <Form.Control
            type = "string"
                name='assignedBy'
                placeholder="Assigned By"
                defaultValue={taskFormData.assignedBy}
                autoFocus
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assigned Date</Form.Label>
            <Form.Control
            type = "date"
                name='taskAssignedDate'
                placeholder="Assigned Date"
                defaultValue={taskFormData.taskAssignedDate}
                autoFocus
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Completed Date</Form.Label>
            <Form.Control
            type = "date"
                name='taskCompletedDate'
                placeholder="Completed Date"
                defaultValue={taskFormData.taskCompletedDate}
                autoFocus
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
            type = "string"
                name='remarks'
                placeholder="Remarks"
                defaultValue={taskFormData.remarks}
                autoFocus
            />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={props.onHide}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
    </Modal >
}