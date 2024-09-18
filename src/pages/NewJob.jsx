import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NewJob = () => {
  const { id } = useParams(); // Task ID (used for editing)
  const navigate = useNavigate(); // For navigation after form submission

  // Initial form data structure
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    contactInfo: '',
    receivedDate: '',
    inventoryReceived: '',
    reportedIssues: '',
    clientNotes: '',
    assignedTechnician: '',
    estimatedAmount: '',
    deadline: '',
    status: '',
    image: '', 
  });


   useEffect(() => {
    if (id) {
      const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskToEdit = existingTasks.find((task) => task.id === parseInt(id));
      if (taskToEdit) {
        setFormData(taskToEdit);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (id) {

      const updatedTasks = existingTasks.map((task) =>
        task.id === parseInt(id) ? { ...formData, id: parseInt(id) } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {

      const newTask = { ...formData, id: Date.now() };
      existingTasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(existingTasks));
    }

    navigate('/'); 
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 bg-primary p-2 text-white">{id ? 'Edit Job Sheet' : 'Create New Job Sheet'}</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="row mb-3">
        <div className="col-md-6">
            <label htmlFor="clientId" className="form-label">Client ID:</label>
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="form-control"
              placeholder="Client ID"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="clientName" className="form-label">Client Name:</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="form-control"
              placeholder="Client Name"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="contactInfo" className="form-label">Contact Info (Phone 10 nos):</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className="form-control"
              placeholder="Contact Info"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="receivedDate" className="form-label">Received Date:</label>
            <input
              type="date"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inventoryReceived" className="form-label">Inventory Received:</label>
            <input
              type="text"
              name="inventoryReceived"
              value={formData.inventoryReceived}
              onChange={handleChange}
              className="form-control"
              placeholder="Inventory Received"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Inventory Image/Document/Video:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="reportedIssues" className="form-label">Reported Issues:</label>
            <input
              type="text"
              name="reportedIssues"
              value={formData.reportedIssues}
              onChange={handleChange}
              className="form-control"
              placeholder="Reported Issues"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="clientNotes" className="form-label">Client Notes:</label>
            <input
              type="text"
              name="clientNotes"
              value={formData.clientNotes}
              onChange={handleChange}
              className="form-control"
              placeholder="Client Notes"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="assignedTechnician" className="form-label">Assigned Technician:</label>
            <input
              type="text"
              name="assignedTechnician"
              value={formData.assignedTechnician}
              onChange={handleChange}
              className="form-control"
              placeholder="Assigned Technician"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="estimatedAmount" className="form-label">Estimated Amount:</label>
            <input
              type="number"
              name="estimatedAmount"
              value={formData.estimatedAmount}
              onChange={handleChange}
              className="form-control"
              placeholder="Estimated Amount"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="deadline" className="form-label">Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {id ? 'Update Job Sheet' : 'Create Job Sheet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewJob;
