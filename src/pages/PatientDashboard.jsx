
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patientsData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-authorization');
        
        // Assuming response.data is the array of patient data
        setPatientData(response.data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const filteredPatients = patientsData?.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.treatmentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientClick = (id) => {
    navigate(`/patient/${id}`); // Navigate to the patient detail page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Patient Dashboard</h1>

      <Link to="/" className="w-full " >
            <button
              type=""
              className="w-[200px] bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 mt-4 ml-[1250px]"
            >
              
              Back To Home
            </button>
            </Link>
     


      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or condition"
          className="p-3 w-full md:w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients?.map((patient) => (
          <div
            key={patient._id}  // Assuming each patient has a unique _id
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4 cursor-pointer hover:bg-blue-50 transition duration-300"
            onClick={() => handlePatientClick(patient._id)} // Use _id for unique patient identifier
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-700">{patient.name}</h2>
              <p className="text-gray-500">Age: {patient.age}</p>
              <p className="text-blue-600 font-semibold">Condition: {patient.treatmentType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;
