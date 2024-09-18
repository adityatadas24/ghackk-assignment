import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewJob from './pages/NewJob';
import TaskDetail from './pages/TaskDetail';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='app'>
  <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-job" element={<NewJob />} />
        <Route path="/edit-job/:id" element={<NewJob />} />
        <Route path="/view-task/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
    </div>
  
  );
}

export default App;
