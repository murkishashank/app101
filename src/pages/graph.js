import { useEffect, useState } from "react";
import { getAllTasks } from "../api/getAllTasks";
import { NavBar } from "../components/NavBar";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllUserIds } from "../api/getAllUserIds";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export const Graph = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [barGraphLabels, setBarGraphLabels] = useState([]);
  const [noTasks, setNoTasks] = useState([]);
  const [noTasksByUsers, setNoTasksByUsers] = useState([0, 0, 0, 0]);

  const doughnutLabels = ["Completed", "Work in progress", "QA", "Assigned"];

  useEffect(() => {
    getAllTasks()
      .then((response) => {
        const allDates = [
          ...new Set(response.map((record) => record.taskCompletedDate)),
        ];
        setBarGraphLabels(allDates);
        setAllTasks(response);
      })
      .catch((error) => console.log);
  }, [noTasks]);

  useEffect(() => {
    getAllUserIds()
      .then((response) => {
        setUsers(response);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    const allTasksData = () => {
      barGraphLabels.forEach((date) => {
        let counter = 0;
        allTasks.forEach((record) => {
          if (
            record.taskCompletedDate === date &&
            record.taskStatus === "Completed"
          ) {
            counter++;
          }
        });
        noTasks.push(counter);
      });
    };
    allTasksData();
  }, [allTasks, barGraphLabels, noTasks]);

  useEffect(() => {
    setNoTasksByUsers([0, 0, 0, 0]);
    const noTasksByUsersClone = [...noTasksByUsers];
    let selectedUsersData;
    console.log("selectedUser", selectedUser !== null);
    const dataByUser = () => {
      if (selectedUser !== null) {
        console.log("Passed1");
        selectedUsersData = allTasks.filter((record) => {
          return record.userId === parseInt(selectedUser.id);
        });
      } else {
        console.log("Passed");
        selectedUsersData = allTasks.map(record => {return record});
        console.log(selectedUsersData);
      }
      doughnutLabels.forEach((label, index) => {
        let counter = 0;
        console.log("selectedUsersData", selectedUsersData);
        selectedUsersData.forEach((record) => {
          if (record.taskStatus === label) {
            counter++;
          }
        });
        noTasksByUsersClone[index] = counter;
      });
      setNoTasksByUsers(noTasksByUsersClone);
    };
    dataByUser();
  }, [selectedUser]);

  ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Tasks",
      },
    },
  };

  const barGraphData = {
    labels: barGraphLabels,
    datasets: [
      {
        label: "Number of tasks completed",
        data: noTasks,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const doughnutData = {
    labels: doughnutLabels,
    datasets: [
      {
        label: "Number of tasks completed",
        data: noTasksByUsers,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const defaultProps = {
    options: users,
    getOptionLabel: (option) => option.userName,
  };

  return (
    <>
      <NavBar></NavBar>
        <>
          <div
            style={{
              position: "relative",
              margin: "auto",
              // width: "40vw",
              // height: "15vh",
            }}
          >
            <Bar data={barGraphData} options={options} />
          </div>
          <div
            style={{
              position: "relative",
              margin: "auto",
              width: "40vw",
              height: "15vh",
            }}
          >
            <Autocomplete
              {...defaultProps}
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => {
                setSelectedUser(newValue);
              }}
              sx={{ width: 300 }}
              defaultValue={options[1]}
              renderInput={(params) => <TextField {...params} label="users" />}
            />
            <Doughnut
              style={{
                position: "relative",
                height: "100px",
                width: "200px",
              }}
              data={doughnutData}
            />
          </div>
        </>
    </>
  );
};
