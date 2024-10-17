
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatientData] = useState(null);
  const [status, setStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-patientById/${id}`);
      setPatientData(response.data);
      setStatus(response.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccessMessage('');

    try {
      await axios.put(`http://localhost:5000/api/update-status/${id}`, { status });
      setIsUpdating(false);
      toast.success('Status updated successfully!');
      fetchPatientData();
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
      toast.error('Failed to update status. Please try again.');
    }
  };

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    
      
      <div className="min-h-screen bg-gray-100 py-10 px-4">
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
    {/* Details Section */}
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Details of {patient?.name}</h2>
      <p className="text-gray-700"><strong>Age:</strong> {patient?.age}</p>
      <p className="text-gray-700"><strong>Condition:</strong> {patient.treatmentType}</p>

      <h3 className="text-xl font-semibold mt-4">Current Status:</h3>
      <p className="text-gray-700">{patient.status}</p>

      {successMessage && <p className="text-green-600 font-semibold mt-2">{successMessage}</p>}

      <form onSubmit={handleUpdateStatus} className="mt-4 flex flex-col">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
          Update Status:
        </label>
        <select
          name="status"
          value={status}
          onChange={handleStatusChange}
          className="w-48 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" // Set width to 200px (48 x 4.16 = 200)
          required
        >
          <option value="">Select a status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
        </select>
        <button
          type="submit"
          className={`mt-2 w-48 bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update Status'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-4">Medication History:</h3>
      <ul className="list-disc list-inside text-gray-700">
        {patient?.medicalHistory?.length > 0 ? (
          patient.medicalHistory.map((medication, index) => (
            <li key={index} className="mb-2">
              <p><strong>Condition:</strong> {medication.condition}</p>
              <p><strong>Treatment:</strong> {medication.treatment}</p>
              <p><strong>Date:</strong> {new Date(medication.date).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <li>No medication history available.</li>
        )}
      </ul>

      {/* New Lab Reports Section */}
      <h3 className="text-xl font-semibold mt-4">Lab Reports:</h3>
      <ul className="list-disc list-inside text-gray-700">
        {patient?.labReports?.length > 0 ? (
          patient.labReports.map((report, index) => (
            <li key={index} className="mb-2">
              <p><strong>Test Name:</strong> {report.testName}</p>
              <p><strong>Result:</strong> {report.result}</p>
              <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <li>No lab reports available.</li>
        )}
      </ul>
    </div>

    {/* Image Section */}
    <div className="flex-shrink-0 w-full md:w-1/2 mt-6 md:mt-0">
      <img
        src="/b2.webp"
        alt=""
        className="w-full h-full object-cover rounded-lg" // Make it fill its container
      />
    </div>
  </div>
</div>

  

      
    

  );
};

export default PatientDetails;
