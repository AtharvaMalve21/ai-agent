AI Agent Dashboard
This project is a full-stack web application for managing and distributing contact lists among a team of sales agents. An administrator can upload a CSV file of contacts, which are then automatically and equally assigned to the active agents registered on the platform.

<br>

Features
Agent Management: Register new agents and view all active agents.

CSV Upload: Securely upload CSV files with contact information.

Automatic Distribution: Contacts are automatically and evenly assigned to available agents.

Lists View: Agents can view their assigned contact lists.

Secure Authentication: User registration and login with protected routes.

User-Friendly UI: A clean and responsive interface using React and Tailwind CSS.

Tech Stack
Frontend

React: For building the user interface.

React Router: For navigation and routing.

Tailwind CSS: For styling the application.

Lucide React: For icons.

React Hot Toast: For user notifications.

Backend

Node.js: The runtime environment.

Express.js: The web application framework.

MongoDB (Mongoose): The NoSQL database for data storage.

Deployment

Frontend: Vercel

Backend: Vercel or any other hosting provider

Getting Started
Prerequisites
Node.js (LTS version)

MongoDB (local or cloud-based)

Git

Installation
Clone the repository:

Bash

git clone <your-repository-url>
cd <your-project-folder>
Backend Setup
Navigate to the backend directory.

Bash

cd backend
npm install
Create a .env file for your environment variables:

PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-secret-key>
Start the backend server:

Bash

npm start
Frontend Setup
Navigate back to the project root and into the frontend directory.

Bash

cd ../frontend
npm install
Create a .env file with the backend API URL:

VITE_API_BASE_URL=http://localhost:5000/api
Start the frontend application:

Bash

npm run dev
Usage
Register: Create an account by navigating to the /register page.

Login: Log in to access the dashboard.

Manage Agents: View all registered agents on the Agents page.

Upload CSV: Go to the Upload page to distribute contacts. The CSV file must have FirstName, Phone, and Notes columns.

View Lists: See the distributed lists and the contacts assigned to each agent on the Lists page.

About the Developer
Name: Atharva Malve

Project: AI Agent Dashboard