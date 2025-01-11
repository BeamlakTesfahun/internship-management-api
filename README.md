# Task Management Platform for InterTechHub

### Overview
This project is a Task Management Website developed for InterTechHub. It streamlines task allocation, tracking, and feedback for admins and students. The platform supports role-based functionalities with secure authentication and user-friendly interfaces.
## Features
### Admin Dashboard
* Manage Tracks:
    * Create tracks.
    * View tasks associated with each track.
* Task Management:
  * Create tasks for respective tracks.
  * View student submissions for tasks.
  * Provide feedback on submissions.
* Student Management:
    * Send invitation emails for student registration.
    * View and manage student enrollment details.
* Secure Authentication:
  * Login for admins and students.
  * Forgot and reset password functionality.
### Student Portal
* Access Assigned Tasks:
    * View available tasks by track.
    * Submit task results.
* Account Management:
  * Secure login after admin invitation.
  * Forgot and reset password support.
## Planned Future Enhancements
### Admin:
* Update and delete track details.
* Enhanced student management features:
* View, update, and delete student profiles.
* Fetch details of students enrolled in specific tracks.
### Student:
* Fetch submission details for specific tasks.
* Improved feedback system for tasks.
## Screenshots
   ### Admin 
![Screenshot (367)](https://github.com/user-attachments/assets/0f94245d-f853-4bfa-8650-e0d34520e3e6)
![Screenshot (371)](https://github.com/user-attachments/assets/8c995121-d864-404e-bd5e-64d4be939297)
![Screenshot (370)](https://github.com/user-attachments/assets/fc063e3c-8bff-45dd-91b1-f15d9cc8e7e1)
![Screenshot (369)](https://github.com/user-attachments/assets/05f063a2-c9f3-4681-b05b-bda728760f55)
  ### Students 
![Screenshot (373)](https://github.com/user-attachments/assets/a535d8f7-a132-4f63-890d-316b2fb12ae5)
![Screenshot (372)](https://github.com/user-attachments/assets/1d6dce70-36b0-4624-b096-a68bc6af0d79)
### Tech Stack
+ Frontend: React.js
+ Backend: Node.js with Express.js
+ Database: MongoDB
+ Authentication: JSON Web Tokens (JWT) and bcrypt
+ Deployment: [Netlify]
## Setup Instructions

### Clone the repository:
```bash
git clone https://github.com/BeamlakTesfahun/task-management-app.git
``` 
### Navigate to the project directory:
```bash
cd task-management-app
``` 
### Install dependencies for both frontend and backend:
```bash
cd client/Task-management && npm install
cd ../../server && npm install
```
### Configure the environment variables in .env files for backend:
#### Backend
```bash
PORT=9000
MONGO_URI=mongodb+srv://intertechub:intertechub24*@intertechub.izxps.mongodb.net/?retryWrites=true&w=majority&appName=intertechub
JWT_SECRET=c0157d75b4267788a19e8a77ee8248d647adfd119819a3085b3e8590d719b901
EMAIL=beamlaktsahilu@gmail.com
EMAIL_PASSWORD=caph dwer gjmt dset
``` 
### Start the application:
#### Frontend
 ```bash
npm run dev
```
#### Backend
```bash
npm run dev
```
### Contributors
* Backend Developer: [Beamlak Tesfahun](https://github.com/BeamlakTesfahun)
* Frontend Developer: [Sefina Kamile](https://github.com/Sefukamil20R)




  

