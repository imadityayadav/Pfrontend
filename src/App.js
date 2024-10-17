import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import PriorAuthorizationForm from './pages/PriorAuthorizationForm';
import PatientDetails from './pages/PatientDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/form" element={<PriorAuthorizationForm />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
