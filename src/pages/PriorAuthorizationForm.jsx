
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const PriorAuthorizationForm = () => {
  const [formData, setFormData] = useState({
    name: '',                // Patient Name
    age: '',                 // Age
    medicalHistory: [{ condition: '', treatment: '', date: '' }],  // Medical History Array
    treatmentPlan: '',        // Treatment Plan
    treatmentType: '',        // Treatment Type
    insurancePlan: '',        // Insurance Plan
    dateOfService: '',        // Date of Service
    diagnosisCode: '',        // Diagnosis Code
    doctorNotes: '',          // Doctor Notes
    labReports: [{ testName: '', result: '', date: '' }], // Lab Reports Array
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicalHistoryChange = (index, e) => {
    const newMedicalHistory = [...formData.medicalHistory];
    newMedicalHistory[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      medicalHistory: newMedicalHistory,
    });
  };

  const handleLabReportChange = (index, e) => {
    const newLabReports = [...formData.labReports];
    newLabReports[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      labReports: newLabReports,
    });
  };

  const addMedicalHistory = () => {
    setFormData({
      ...formData,
      medicalHistory: [...formData.medicalHistory, { condition: '', treatment: '', date: '' }],
    });
  };

  const addLabReport = () => {
    setFormData({
      ...formData,
      labReports: [...formData.labReports, { testName: '', result: '', date: '' }],
    });
  };

  const validateForm = () => {
    let formErrors = {};
    // Add validations for the new fields
    if (!formData.name) {
      formErrors.name = 'Patient Name is required';
    }
    if (!formData.age) {
      formErrors.age = 'Age is required';
    }
    if (!formData.treatmentType) {
      formErrors.treatmentType = 'Treatment Type is required';
    }
    if (!formData.insurancePlan) {
      formErrors.insurancePlan = 'Insurance Plan is required';
    }
    if (!formData.dateOfService) {
      formErrors.dateOfService = 'Date of Service is required';
    }
    if (!formData.diagnosisCode) {
      formErrors.diagnosisCode = 'Diagnosis Code is required';
    }
    
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/create-authorization', formData);
        console.log('Authorization submitted:', response.data);
        toast.success('Authorization submitted successfully!'); // Success toast
      } catch (error) {
        console.error('Error submitting authorization', error);
        toast.error('Error submitting authorization. Please try again.'); // Error toast
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Prior Authorization Form
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Patient Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Patient Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Age */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Medical History */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Medical History
            </label>
            {formData.medicalHistory.map((entry, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  name="condition"
                  placeholder="Condition"
                  value={entry.condition}
                  onChange={(e) => handleMedicalHistoryChange(index, e)}
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="treatment"
                  placeholder="Treatment"
                  value={entry.treatment}
                  onChange={(e) => handleMedicalHistoryChange(index, e)}
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  name="date"
                  value={entry.date}
                  onChange={(e) => handleMedicalHistoryChange(index, e)}
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addMedicalHistory}
              className="text-blue-500"
            >
              + Add Another Medical History
            </button>
          </div>

          {/* Treatment Plan */}
          <div className="mb-4">
            <label htmlFor="treatmentPlan" className="block text-gray-700 font-bold mb-2">
              Treatment Plan
            </label>
            <input
              type="text"
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Treatment Type */}
          <div className="mb-4">
            <label htmlFor="treatmentType" className="block text-gray-700 font-bold mb-2">
              Treatment Type
            </label>
            <input
              type="text"
              name="treatmentType"
              value={formData.treatmentType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.treatmentType && <p className="text-red-500 text-sm">{errors.treatmentType}</p>}
          </div>

          {/* Insurance Plan */}
          <div className="mb-4">
            <label htmlFor="insurancePlan" className="block text-gray-700 font-bold mb-2">
              Insurance Plan
            </label>
            <input
              type="text"
              name="insurancePlan"
              value={formData.insurancePlan}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.insurancePlan && <p className="text-red-500 text-sm">{errors.insurancePlan}</p>}
          </div>

          {/* Date of Service */}
          <div className="mb-4">
            <label htmlFor="dateOfService" className="block text-gray-700 font-bold mb-2">
              Date of Service
            </label>
            <input
              type="date"
              name="dateOfService"
              value={formData.dateOfService}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.dateOfService && <p className="text-red-500 text-sm">{errors.dateOfService}</p>}
          </div>

          {/* Diagnosis Code */}
          <div className="mb-4">
            <label htmlFor="diagnosisCode" className="block text-gray-700 font-bold mb-2">
              Diagnosis Code
            </label>
            <input
              type="text"
              name="diagnosisCode"
              value={formData.diagnosisCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.diagnosisCode && <p className="text-red-500 text-sm">{errors.diagnosisCode}</p>}
          </div>

          {/* Doctor Notes */}
          <div className="mb-4">
            <label htmlFor="doctorNotes" className="block text-gray-700 font-bold mb-2">
              Doctor Notes
            </label>
            <textarea
              name="doctorNotes"
              value={formData.doctorNotes}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Lab Reports */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Lab Reports
            </label>
            {formData.labReports.map((report, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  name="testName"
                  placeholder="Test Name"
                  value={report.testName}
                  onChange={(e) => handleLabReportChange(index, e)}
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="result"
                  placeholder="Result"
                  value={report.result}
                  onChange={(e) => handleLabReportChange(index, e)}
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  name="date"
                  value={report.date}
                  onChange={(e) => handleLabReportChange(index, e)}
                  className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addLabReport}
              className="text-blue-500"
            >
              + Add Another Lab Report
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit Authorization Request
            </button>
            
          </div>
        </form>
        <Link to="/" className="w-full mt-4" >
            <button
              type=""
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
            >
              
              Back To Home
            </button>
            </Link>
      </div>
      
    </div>
  );
};

export default PriorAuthorizationForm;
