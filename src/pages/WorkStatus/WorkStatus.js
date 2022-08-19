import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { workStatusColDefs } from "./colDefs";
import { getWorkStatusByUserId } from "../../api/getUserByUserName";
import { PostWorkStatus } from "../../api/postWorkStatus";
import { getSavePayload } from "./validateSave";
import { FormLabel } from "@mui/material";
import { useWorkStatusSlice } from "./slice/actions";
import { useSelector, useDispatch } from "react-redux";
import { selectSavingStatus, selectUserRecords } from "./slice/selectors";

export const WorkStatus = () => {
  const rowData = useSelector(selectUserRecords);
  const userId = localStorage.getItem("userID");
  const savingStatus = useSelector(selectSavingStatus);

  const { actions } = useWorkStatusSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    getWorkStatusByUserId(userId).then((data) => {
      dispatch(actions.loadWorkStatusRecords(data));
    });
  }, []);

  const handleCellChange = (event) => {
    const { id, field, value } = event;
    dispatch(actions.updateUserRecord({ id: id, key: field, value: value }));
  };

  const handleSave = () => {
    dispatch(actions.updateSavingStatus(true));
    const payload = getSavePayload(rowData);

    PostWorkStatus(payload).then((response) => {
      if (response.status === 200) {
        alert("Details saved successfully.");
        dispatch(actions.updateSavingStatus(false));
      } else {
        alert("Error while saving data.");
      }
    });
  };

  return (
    <div>
      <div style={{ height: 500, width: "inherit" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="secondary" onClick={handleSave}>
            {savingStatus ? (
              <FormLabel>Saving </FormLabel>
            ) : (
              <FormLabel>Save</FormLabel>
            )}
          </Button>
        </div>
        <DataGrid
          rows={rowData}
          columns={workStatusColDefs}
          onCellEditCommit={handleCellChange}
        ></DataGrid>
      </div>
    </div>
  );
};
