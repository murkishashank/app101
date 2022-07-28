import React, { Component } from "react";
import Button from "react-bootstrap/Button";
export const BtnCellRenderer = (props) => {

  
  const saveLeaveRecord = () => {
    props.clicked(props.data);

  }
  return (
    <Button onClick={saveLeaveRecord}>Send</Button>
  );
}