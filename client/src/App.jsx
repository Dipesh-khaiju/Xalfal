import React from 'react';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from "./pages/Home/Home";
import {Routes,Route,Navigate} from 'react-router-dom'
import {Toaster } from "react-hot-toast";
import { useAuthContext } from './context/AuthContext';


const App = () => {
  const {authUser} = useAuthContext();
  return (
    <>
    <div className='h-screen p-4 flex items-center justify-center'>
    <Routes>
      <Route path="/" element={(authUser ?<Home /> : <Navigate to={"/login"} /> )} />
       <Route path="/login" element={(authUser ?<Navigate to="/" /> : <Login />)} />
      <Route path="/signup" element={(authUser ?<Navigate to="/" /> : <Signup />)} />
    </Routes>
    <Toaster />

    </div>
    
    </>
  )
}

export default App