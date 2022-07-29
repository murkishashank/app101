import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

export const LeaveForm = (props) => {
    let errorObj = props.errorObject;
    let leaveFormData = props.leaveObj

    const handleOnChange = (event) => {
        props.onChange(event);
    }

    const handleSubmit = () => {
        props.onSubmit();
    }

    return <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Apply for leave
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                        type="date"
                        name='fromDate'
                        placeholder="From Date"
                        onChange={handleOnChange}
                        defaultValue={leaveFormData.fromDate}
                        autoFocus
                    />
                </Form.Group>
                <p className='errorMessage'>{errorObj.fromDate}</p>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>To Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="To Date"
                        name='toDate'
                        onChange={handleOnChange}
                        defaultValue={leaveFormData.toDate}
                        autoFocus
                        required
                    />
                </Form.Group>
                <p className='errorMessage'>{errorObj.toDate}</p>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Reason</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={handleOnChange} name='reason' defaultValue={leaveFormData.reason} />
                </Form.Group>
                <p className='errorMessage'>{errorObj.reason}</p>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Leave Type</Form.Label>
                    <Form.Select onChange={handleOnChange} name='leaveType' defaultValue={leaveFormData.leaveType} >
                        <option></option>
                        <option>Leave</option>
                        <option>Work from Home</option>
                        <option>Client Meet</option>
                    </Form.Select>
                </Form.Group>
                <p className='errorMessage'>{errorObj.leaveType}</p>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={props.onHide}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
    </Modal >
}