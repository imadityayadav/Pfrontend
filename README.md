Installation

Follow these steps to set up the project locally:

Clone the Repository:

bash:
git clone https://github.com/your-username/patient-health-dashboard.git
cd patient-health-dashboard
Install Dependencies:

Navigate to the project root directory and install dependencies for both the frontend and backend.

For Frontend:

bash
cd frontend
npm install

For Backend:

bash

cd backend
npm install
Environment Variables
Create a .env file in the backend directory with the following variables:

makefile .env

MONGODB_URI=<your_mongodb_connection_string>
PORT=5000
Replace <your_mongodb_connection_string> with your actual MongoDB connection string.

Folder Structure
Here's the structure of the project:

bash
Copy code
/patient-health-dashboard
│
├── /frontend                 # Frontend React application
│   ├── /public
│   ├── /src
│   ├── package.json
│
├── /backend                  # Backend Node.js application
│   ├── /models               # Mongoose models
│   ├── /routes               # Express routes
│   ├── /config               # Configuration files
│   ├── server.js             # Main server file
│   ├── package.json
│
└── README.md                 # Documentation


Running the Project

1. Start the Backend Server
Navigate to the backend directory and start the server:

bash

cd backend
node server.js


2. Start the Frontend Development Server
In a new terminal window, navigate to the frontend directory and start the development server:

bash
cd frontend
npm start

The application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

Usage
Open your browser and navigate to http://localhost:3000 to access the Patient Health Dashboard.
Use the dashboard to view patient data, submit prior authorization requests, and manage patient health records.


API Endpoints
1. Patient Data API

GET /api/patients: Fetch all patients.
GET /api/patients/:id: Fetch a patient by ID.


2. Authorization API

POST /api/authorization: Submit a new prior authorization request.
GET /api/authorization: Fetch all authorization requests.


Technologies Used
Frontend: React, Tailwind CSS/Bootstrap
Backend: Node.js, Express, MongoDB
Database: MongoDB
