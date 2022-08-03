import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { getAllUserIds } from "../api/getAllUserIds";

export const TaskForm = (props) => {
    let leaveFormData = props.taskObj
    const handleOnChange = (event) => {
        props.onChange(event);
    }

    const handleSubmit = () => {
        props.onSubmit();
    }
    const[userIds, setUserIds] = useState([]);

    const fetchUserName = () => {
        getAllUserIds().then((data) => {
            setUserIds(data)
        });
      };
  
      useEffect(() => {
        // console.log("done", props)
        fetchUserName();
      }, []);

    const options = ["Assigned", "WIP", "QA", "Completed"];

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
                <Form.Label>User Id</Form.Label>
                <Form.Select onChange={handleOnChange} name='userId' defaultValue={leaveFormData.userId} >
                        {userIds.map(option => {
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
                        defaultValue={leaveFormData.taskName}
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
                        defaultValue={leaveFormData.taskDescription}
                        autoFocus
                        required
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Task Status</Form.Label>
                    <Form.Select onChange={handleOnChange} name='taskStatus' defaultValue={leaveFormData.taskStatus} >
                        {options.map(option => {
                            return(<option> {option}</option>)
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assigned By</Form.Label>
            <Form.Control
                type="Integer"
                name='assignedBy'
                placeholder="Assigned By"
                onChange={handleOnChange}
                defaultValue={leaveFormData.assignedBy}
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