import React,{useState, useEffect, useRef} from 'react';

import Sidebar from '../../../components/Sidebar/sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ReportIcon from '@mui/icons-material/Report';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link } from 'react-router-dom';




const Dashboard= () => {
  const[ accordianDashboard, setAccordingDashboard]= useState(false);
const ref =useRef();

useEffect(()=>{

const checkIfClickedOutsise = e =>{
  if( accordianDashboard && ref.current && !ref.current.contains(e.target)){
    setAccordingDashboard(false)
  }
}
document.addEventListener("mousedown",checkIfClickedOutsise)
return()=>{
  document.removeEventListener("mousedown",checkIfClickedOutsise)
}

},[ accordianDashboard])


  const handleOnClickMenu=(Value)=>{
    sessionStorage.setItem('func',Value)
  }



  return (
    <div className='w-3/4  text-black p-5 reltive'>
    <div className='w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center'> 
    <MenuIcon sx={{cursor:"pointer"}}  onClick ={() =>{setAccordingDashboard(prev=>!prev)}}/>
    
      <img className='w-8 h-8 rounded-3xl border-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fxVFCU2kE1n9vJEOddDtfZgFDJerJYBGPg&s' alt='logo'/>
    </div>

    {
      accordianDashboard && <div ref={ref} className='absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight'>
<div> Hi welcome to Our GYM Management System.</div>
<p> Feel Free to ask any querries</p>


</div>
    }


    <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%'>

     
     
       <Link to ={'/member'}className=' w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
     <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>   
         </div>
     <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'> 
      < PeopleIcon sx={{color:"green", fontSize:"50px"}} />
      <p className='text-xl my-3 font-semibold font-mono'> Joined Members</p>

     </div>
       </Link>


       <Link to={'/specific/monthly'}  onClick={()=>handleOnClickMenu("monthlyJoined")} className=' w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
     <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>   
         </div>
     <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'> 
      < SignalCellularAltIcon sx={{color:"purple", fontSize:"50px"}} />
      <p className='text-xl my-3 font-semibold font-mono'>Monthly Joined</p>

     </div>
       </Link>
       <Link to={'/specific/expire-with-in-3-days'} onClick={()=>handleOnClickMenu("threeDayExpire")} className=' w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
     <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>   
         </div>
     <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'> 
      < AccessAlarmIcon sx={{color:"red", fontSize:"50px"}} />
      <p className='text-xl my-3 font-semibold font-mono'> Expiring within 3 days</p>

     </div>
       </Link>

       <Link  to={'/specific/expire-with-in-4-7-days'} onClick={()=>handleOnClickMenu("fourToSevenDayExpire")}  className=' w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
     <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>   
         </div>
     <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'> 
      <AccessAlarmIcon sx={{color:"red", fontSize:"50px"}} />
      <p className='text-xl my-3 font-semibold font-mono'> Expiring within 4-7 days</p>

     </div>
       </Link>
       <Link to={'/specific/expired'}onClick={()=>handleOnClickMenu("expired")}  className=' w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
     <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>   
         </div>
     <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'> 
      < ReportIcon sx={{color:"red", fontSize:"50px"}} />
      <p className='text-xl my-3 font-semibold font-mono'> Expired </p>

     </div>
       </Link>
       <Link to={'/specific/Inactive-members'} onClick={()=>handleOnClickMenu("inactiveMembers")} className=' w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
     <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>   
         </div>
     <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'> 
      < ReportGmailerrorredIcon sx={{color:"brown", fontSize:"50px"}} />
      <p className='text-xl my-3 font-semibold font-mono'> Inactive Members </p>

     </div>
       </Link>


    </div>
    <div className='md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl'> 
    contact developer for any technical Error at 9305334154</div>
     
    </div>
  )
}

export default Dashboard
