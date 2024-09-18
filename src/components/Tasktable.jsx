import React from "react";
import { useNavigate } from "react-router-dom";

const TaskTable = ({ tasks, searchQuery }) => {

  const filteredTasks = tasks.filter(
    (task) =>
      task.clientId.includes(searchQuery) ||
      task.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-job/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = existingTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleView = (id) => {
    navigate(`/view-task/${id}`);
  };

  return (
    <table className="tbl table table-bordered table-striped w-75">
      <thead className="thead-dark bg-primary">
        <tr className="bg-primary">
          <th>Client ID</th>
          <th>Client Name</th>
          <th>Contact Info</th>
          <th>Received Date</th>
          <th>Inventory Received</th>
          <th>Reported Issues</th>
          <th>Notes</th>
          <th>Assigned Technician</th>
          <th>Estimated Amount</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.clientId}</td>
            <td>{task.clientName}</td>
            <td>{task.contactInfo}</td>
            <td>{task.receivedDate}</td>
            <td>{task.inventoryReceived}</td>
            <td>{task.reportedIssues}</td>
            <td>{task.clientNotes}</td>
            <td>{task.assignedTechnician}</td>
            <td>{task.estimatedAmount}</td>
            <td>{task.deadline}</td>
            <td>{task.status}</td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleEdit(task.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-warning btn-sm mx-2"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleView(task.id)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
