# Support CRM

A full-stack Support CRM application for creating, managing, searching, filtering, and updating customer support tickets.

## Features

- Create support tickets
- Automatically generate ticket IDs
- Store customer name and email
- Store issue subject and description
- View all support tickets
- Search tickets by name, ticket ID, email, or description
- Filter tickets by status
- View complete ticket details
- Update ticket status
- Add notes/comments to tickets
- Responsive React frontend
- MongoDB database
- REST API using Node.js and Express

## Technology Stack

### Frontend
- React
- Vite
- React Router
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
support-crm/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md