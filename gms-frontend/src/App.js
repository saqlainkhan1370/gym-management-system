import {  Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 
import Home from './pages/home/home';
import Dashboard from './pages/home/Dashboard/dashboard';
import Sidebar from './components/Sidebar/sidebar';
import { useState,  useEffect,  } from 'react';
import Member from './pages/Member/member';
import GeneralUser from './pages/GenralUser/generalUser';
import MemberDetail from './pages/MemberDetail/memberDetail';
import 'react-toastify/dist/ReactToastify.css';


 // Correct import


function App() {
   const navigate = useNavigate();

   const[ isLogin, setIsLogin ] = useState(false)

   useEffect(()=>{
       let isLogin = localStorage.getItem("isLogin");
       if(isLogin){
          setIsLogin(true);
         navigate('/dashboard')
       }else{
        setIsLogin(false)
        navigate('/');
       }
   },[ localStorage.getItem("isLogin")])
   
  return (
    <div className='flex'>
    {
      isLogin &&  <Sidebar />
    }
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} /> 
        <Route path='/member' element ={< Member />}/>
        <Route path='/specific/:page' element={<GeneralUser/>} />
        <Route path='/member/:id' element ={< MemberDetail />}/>
      </Routes>
      </div>
  );
}

export default App;
