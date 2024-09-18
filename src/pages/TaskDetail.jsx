import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const selectedTask = tasks.find((task) => task.id === parseInt(id));
      setTask(selectedTask);
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id) => {
    navigate(`/edit-job/${id}`);
  };

  const handleSavePdf = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("task-details.pdf");
    });
  };

  return (
    <div className="view-container" id="pdf-content">
      <div className="view-header">
        <h2>VIEW JOB SHEET</h2>
      </div>
      <div className="view-content">
        <div className="view-row">
          <label>Client ID:</label>
          <span>{task.clientId}</span>
        </div>
        <div className="view-row">
          <label>Client Name:</label>
          <span>{task.clientName}</span>
        </div>
        <div className="view-row">
          <label>Contact Info:</label>
          <span>{task.contactInfo}</span>
        </div>
        <div className="view-row">
          <label>Received Date:</label>
          <span>{task.receivedDate}</span>
        </div>
        <div className="view-row">
          <label>Inventory Received:</label>
          <span>{task.inventoryReceived}</span>
        </div>
     
        <div className="view-row">
          <label>Reported Issues:</label>
          <span>{task.reportedIssues}</span>
        </div>
        <div className="view-row">
          <label>Client Notes:</label>
          <span>{task.clientNotes}</span>
        </div>
        <div className="view-row">
          <label>Assigned Technician:</label>
          <span>{task.assignedTechnician}</span>
        </div>
        <div className="view-row">
          <label>Estimated Amount:</label>
          <span>{task.estimatedAmount}</span>
        </div>
        <div className="view-row">
          <label>Deadline:</label>
          <span>{task.deadline}</span>
        </div>
        <div className="view-row">
          <label>Status:</label>
          <span>{task.status}</span>
        </div>
        <div className="view-row">
          <label>Add or Update Note:</label>
          <input type="text" />
        </div>
      </div>
      <div className="view-footer">
        <button className="w-100 bg-primary" onClick={() => handleEdit(id)}>
          Edit
        </button>
        <h3 className="text-primary text-center" onClick={() => navigate("/")}>
          Back
        </h3>
        <button className="btn btn-primary bg-primary " onClick={handleSavePdf}>
          Save as PDF
        </button>{" "}
      </div>
    </div>
  );
};

export default ViewTask;
