import React, { Component } from "react";
import Button from "react-bootstrap/Button";
export const BtnCellRenderer = (props) => {

  
  const saveLeaveRecord = () => {
    // console.log(props.data);
    props.clicked(props.data);

  }
  return (
    <Button onClick={saveLeaveRecord}>Send</Button>
  );
}