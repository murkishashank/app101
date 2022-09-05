import Button from '@mui/material/Button';
import ReactDOM from 'react-dom/client';
import "../css/CommonStyling.css";
import { useEffect, useState } from "react";

import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

export const ScheduleFor = (props) => {
    const handleSubmit = () => {
      props.onSubmit();
    }
    const handleOnChange = (event) => {
      props.onChange(event);
  }

  return (
    <div className="form">
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch', height: 100 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          label="Title"
          defaultValue=""
          placeholder="Name"
          name="title"
          onChange= {handleOnChange}
          variant="filled"
        />
        <TextField
          required
          type="date"
          name="start"
          defaultValue=""
          label="start date"
          InputLabelProps={{ shrink: true, required: true }}
          variant="filled"
          onChange= {handleOnChange}

        />
         <TextField
          type="date"
          label="end Date"
          variant="filled"
          name="end"
          InputLabelProps={{ shrink: true, required: true }}
          onChange= {handleOnChange}
        />
      </div>
    <Button onClick = {handleSubmit} variant = "contained">Submit </Button>
    </Box>
    </div>
  );
}
