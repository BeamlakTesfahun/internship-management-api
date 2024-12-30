import { useState } from 'react'

import './App.css'
// import Navbar from './components/navbar'
// import Footer from './components/footer'

import { BrowserRouter } from 'react-router-dom'
// import Login from './pages/auth/login'
// import ResetPassword from './pages/auth/resetpassword'
import ForgotPassword from './pages/auth/forgotpassword'
function App() {

  return (
    <BrowserRouter>
     {/* <Login/> */}
     {/* <ResetPassword/> */}
     <ForgotPassword/>
    {/* <Navbar/>
   

    <Footer/> */}
    </BrowserRouter>
  )
}

export default App
