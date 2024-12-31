import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSignUp from './pages/auth/register_admin';
import AdminLogin from './pages/auth/admin-login';
import AdminInviteUser from './pages/auth/invite-user';
import SetupAccount from './pages/auth/accountsetup';
import UserLogin from './pages/auth/login';
import ForgotPassword from './pages/auth/forgotpassword';
import ResetPassword from './pages/auth/resetpassword';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register-admin" element={<AdminSignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/invite-user" element={<AdminInviteUser />} />
        <Route path="/auth/setup-account/:token" element={<SetupAccount />} />
        <Route path="/auth/login" element={<UserLogin />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />


        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;