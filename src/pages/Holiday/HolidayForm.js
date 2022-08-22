import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import {companyOptions} from "../../components/HolidayColDefs"



export const HolidayForm = (props) => {
    let holidayFormData = props.dataObj

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
        <Modal.Header closeButton variant="primary">
            <Modal.Title id="contained-modal-title-vcenter">
                Add New Holiday
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Occasion
                    </Form.Label>
                    <Form.Control
                        type="String"
                        placeholder="Task Description"
                        name='occasion'
                        onChange={handleOnChange}
                        defaultValue={holidayFormData.occasion}
                        autoFocus
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assigned Date</Form.Label>
            <Form.Control
            type = "date"
                name='date'
                placeholder="Assigned Date"
                defaultValue={holidayFormData.date}
                autoFocus
            />
            </Form.Group>
            <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Company</Form.Label>
                    <Form.Select onChange={handleOnChange} name='company' defaultValue={holidayFormData.company} >
                        {companyOptions.map(option => {
                            return(<option> {option}</option>)
                        })}
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={props.onHide}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
    </Modal >
}