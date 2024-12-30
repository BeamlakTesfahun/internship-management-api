import { useState } from 'react'

import './App.css'
// import Navbar from './components/navbar'
// import Footer from './components/footer'

import { BrowserRouter } from 'react-router-dom'
// import StudentView from './pages/students/studentview'
// import Login from './pages/auth/login'
// import AdminDashboard from './pages/Admin/admin_dashboard'
// import TaskManagementPage from './pages/Admin/Task-management'
// import SubmissionManagementPage from './pages/Admin/AdminViewSubmissions'
// import ResetPassword from './pages/auth/resetpassword'
// import ForgotPassword from './pages/auth/forgotpassword'
// import TaskList from './pages/Admin/TaskList'
import SetPassword from './pages/auth/accountsetup'
function App() {

  return (
    <BrowserRouter>
    {/* <SubmissionManagementPage/> */}
      {/* <Login/>  */}
      {/* <AdminDashboard/> */}
      {/* <TaskManagementPage/> */}
     {/* <ResetPassword/> */}
     {/* <ForgotPassword/> */}
     {/* <StudentView/> */}
     <SetPassword/>

     
    {/* <Navbar/>
   

    <Footer/> */}
    </BrowserRouter>
  )
}

export default App
