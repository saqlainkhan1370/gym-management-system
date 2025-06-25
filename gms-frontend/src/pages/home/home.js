import React from 'react'
import Login from '../../components/login/login'
import Signup from '../../components/signup/signup'

const Home = () => {
  return (
    <div className=' w-full h-[100vh]'>
         <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-2xl'>
                Welcome To Gym Management System
    </div>
    <div className='w-full  bg-cover flex justify-center  h-[100%] bg-[url("https://c4.wallpaperflare.com/wallpaper/206/268/839/pose-muscle-muscle-rod-press-hd-wallpaper-preview.jpg")]'>
         <div className='w-full lg:flex gap-32 '>


            <Login />
            <Signup />


         </div>
        
    </div>
      
    </div>
  )
}

export default Home
