import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postUser } from "../api/postUser"

export const EditProfileComponent = (props) => {
    console.log(props)
    const [userData, setUserData] = useState({});
    useEffect(() => {
        setUserData(props.userData)
    }, [props]);
    const fields = ["designation", "reportingManager", "mobileNumber", "email",
        "permanentAddress", "contactAddress", "joiningDate", "alternativeMobileNumber"]
    const [fieldNames, setNames] = useState({})
    const [editData, setEditData] = useState({})


    const handleOnChange = (key, value) => {
        const userDataClone = { ...userData, [key]: value }
        setUserData(userDataClone)
    }


    const handleCheck = (key, value) => {
        if (fieldNames[key] === "") {
            const fieldNamesClone = { ...fieldNames, [key]: true }
            setNames(fieldNamesClone)
        }
        else {
            const fieldNamesClone = { ...fieldNames, [key]: !value }
            setNames(fieldNamesClone)
        }
    }

    const handleOnEdit = (key, value) => {
        const editUserDataClone = { ...editData, [key]: value }
        setEditData(editUserDataClone)
    }

    const handleSubmit = () => {
        // requestSubmit()
        const userClone = { ...userData, udfs: editData }
        setUserData(userClone)
        console.log("2", userClone)
        const saveData = postUser(userClone)
        saveData.then(response => {
            if (response) {
                console.log(response)
                alert("Edit request successful");
                props.onHide()
            }
        })

    }
    return (
        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Title>Select fields to edit</Modal.Title>

            <Modal.Body>
                <>
                    {fields.map((key) => {
                        return (
                            <Form.Group>
                                <Form.Check type="checkbox" label={key} onChange={() => { handleCheck(key, fieldNames[key]) }}></Form.Check>
                                {fieldNames[key] && (key === "permanentAddress" || key === "contactAddress" ? <Form.Control as={"textarea"}></Form.Control>

                                    : <Form.Control type="text" onChange={(event) => { handleOnEdit(key, event.target.value) }}>
                                    </Form.Control>
                                )}

                            </Form.Group>
                        )
                    })}

                </>
            </Modal.Body>
            <Modal.Footer style={{ padding: "5px" }}>
                <Button variant="outline-danger" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>

        </Modal>
    )
}