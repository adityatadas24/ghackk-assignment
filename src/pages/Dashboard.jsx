import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx"; 
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import TaskTable from "../components/TaskTable.jsx";

const Dashboard = () => {
  const initialTasks = [
    {
      id: 1,
      clientId: "nand9953",
      clientName: "Nandini Goswami",
      contactInfo: "1234567890",
      receivedDate: "2024-09-05",
      inventoryReceived: "mouse",
      reportedIssues: "hgh",
      clientNotes: "f",
      assignedTechnician: "f",
      estimatedAmount: "None",
      deadline: "2024-09-18",
      status: "in-progress",
    },
    {
      id: 2,
      clientId: "dfgd5644",
      clientName: "Dfgdfgh",
      contactInfo: "5645645644",
      receivedDate: "2024-09-13",
      inventoryReceived: "gfs",
      reportedIssues: "dfghfgh",
      clientNotes: "dfg",
      assignedTechnician: "sdfg",
      estimatedAmount: "43534.0",
      deadline: "2024-09-12",
      status: "pending",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleNewJob = () => {
    navigate("/new-job");
  };

  useEffect(() => {
    const fetchTasks = () => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
      } else {
        localStorage.setItem("tasks", JSON.stringify(initialTasks));
      }
    };

    fetchTasks();
  }, []); 

  return (
    <div className="container-fluid">
      <h1 className="text-center bg-primary p-2 text-white">
        HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD
      </h1>

      <SearchBar onSearch={handleSearch} />
      <div className="my-4 d-flex justify-content-center align-items-center">
        <Button variant="primary" onClick={handleNewJob}>
          New Job Sheet
        </Button>
      </div>
      <div>
        <TaskTable tasks={tasks} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Dashboard;
