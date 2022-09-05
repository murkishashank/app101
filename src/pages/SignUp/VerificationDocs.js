import React, { useRef, useState } from "react";
import { Box, Input } from "@mui/material";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signUpSlice } from "./slice/actions";
import { selectUserDetails, selectVerifactionDocs } from "./slice/selectors";

export const VerificationDocs = () => {
  const imageRef = useRef();
  const [uploadStatus, setUploadStatus] = useState("Upload");
  const dispatch = useDispatch();
  const { actions } = signUpSlice;
  const VerificationDocs = useSelector(selectVerifactionDocs);
  const { addressProof } = VerificationDocs;

  const handleUploadBtn = () => {
    var image = imageRef.current.firstChild.files[0];
    console.log("Passed1");
    let fr = new FileReader();
    fr.readAsDataURL(image);
    fr.onload = (event) => {
      if (event.target.result.includes("image")) {
        var fileBase64 = event.target.result;
        dispatch(
          actions.updateVerificationDocs({ key: "addressProof", value: fileBase64 })
        );
        if (addressProof !== null && addressProof !== "") {
          setUploadStatus("Uploaded");
        }
      } else {
        alert("Only images are allowed.");
      }
    };
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 5 }}>
        <label
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <h6>
            Upload address proof: <span>*</span>
          </h6>
          <Input
            required
            type={"file"}
            name="addressProof"
            ref={imageRef}
            sx={{ mr: "10px" }}
          />
          <Button id="submit" onClick={handleUploadBtn} sx={{ margin: "5px" }}>
            {uploadStatus}
          </Button>
        </label>
      </Box>
    </>
  );
};
