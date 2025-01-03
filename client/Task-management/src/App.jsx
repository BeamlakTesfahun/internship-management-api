import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSignUp from './pages/auth/register_admin';
import AdminLogin from './pages/auth/admin-login';
import AdminInviteUser from './pages/auth/invite-user';
import SetupAccount from './pages/auth/accountsetup';
import UserLogin from './pages/auth/login';
import ForgotPassword from './pages/auth/forgotpassword';
import ResetPassword from './pages/auth/resetpassword';
import CreateTrack from './pages/Tracks/CreateTrack';
import TracksList from './pages/Tracks/TracksList';
import CreateTask from './pages/Tasks/CreateTask';
import AdminTasks from './pages/Tasks/AdminTasks';
import StudentTasks from './pages/Tasks/StudentTasks';
import UpdateTask from './pages/Tasks/UpdateTask';
import DeleteTask from './pages/Tasks/DeleteTask';
import SubmitTask from './pages/Tasks/SubmitTask';
import SubmissionDetails from './pages/Tasks/SubmissionDetails';
import ProvideFeedback from './pages/Tasks/ProvideFeedback';
import AllSubmissions from './pages/Tasks/AllSubmissions';
import AdminDashboard from './pages/Admin/admin_dashboard';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AdminDashboard />} />

        <Route path="/Dashboard" element={<AdminDashboard />} />
        <Route path="/register-admin" element={<AdminSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/invite-user" element={<AdminInviteUser />} />
        <Route path="/auth/setup-account/:token" element={<SetupAccount />} />
        <Route path="/auth/login" element={<UserLogin />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route path="/tracks/create" element={<CreateTrack />} />
        <Route path="/tracks" element={<TracksList />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/tasks/admin" element={<AdminTasks />} />
        <Route path="/tasks/student" element={<StudentTasks />} />
        <Route path="/tasks/update/:taskId" element={<UpdateTask />} />
        <Route path="/tasks/delete/:taskId" element={<DeleteTask />} />
        <Route path="/submissions/submit-task/:taskId" element={<SubmitTask />} />
        <Route path="/submissions/details/:submissionId" element={<SubmissionDetails />} />
        <Route path="/submissions/feedback/:submissionId" element={<ProvideFeedback />} />
        <Route path="/submissions/all/:taskId" element={<AllSubmissions />} />
        

        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;