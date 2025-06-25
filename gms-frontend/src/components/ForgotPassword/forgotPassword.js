import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import { ToastContainer , toast} from "react-toastify";


const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const[otpValidate, setOtpValidate] =useState(false)
  const[loader,setLoader] =useState(false)


  const[contentVal, setContentValue ] =useState("Submit your Email")
  const [ inputField,setInputFeild]=useState({email:"", otp:"",newPassword:""})

  const handleSubmit = () => {
    if (!emailSubmit) {
   
      sendOtp()
    }else if(emailSubmit && !otpValidate){
      
        verifyOTP();
    }else{

       changePassword()

    }
  };

  const changePassword = async()=>{
    setLoader(true);
    await axios.post('http://localhost:4000/auth/reset-password',{email:inputField.email,newPassword:inputField.newPassword}).then((response)=>{
      
      toast.success(response.data.message)
      setLoader(false)

    }).catch(err=>{
      toast.error("Some technical issue while sending mail")
      console.log(err);
      setLoader(false)
     })
  }


   const verifyOTP = async()=>{
    setLoader(true);
    await axios.post('http://localhost:4000/auth/reset-password/checkOtp',{email:inputField.email,otp:inputField.otp}).then((response)=>{
      setOtpValidate(true)
      setContentValue("Submit your New Password")
      toast.success(response.data.message)
      setLoader(false)

    }).catch(err=>{
      toast.error("Some technical issue while sending mail")
      console.log(err);
      setLoader(false)
     })
  }


  const sendOtp = async()=>{

       setLoader(true);
       await axios.post('http://localhost:4000/auth/reset-password/sendOtp',{email:inputField.email}).then((response)=>{
        setEmailSubmit(true)
        setContentValue("submit your OTP")
        toast.success(response.data.message);
setLoader(false)



       }).catch(err=>{
        toast.error("Some technical issue  in sending mail")
        console.log(err);
        setLoader(false)
       })
      
  }




   const handleOnchange  =(event,name)=>{
    setInputFeild({...inputField,[name]:event.target.value})
    console.log(inputField)
   }

  return (
    <div className="w-full">
      <div className="w-full mb-5">
        <div> Enter your Email</div>
        <input
          type="text"
          value={inputField.email}
          onChange={(event)=>{handleOnchange(event,"email")}}
          className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
          placeholder="Enter Email"
        />
      </div>

      {emailSubmit && 
        <div className="w-full mb-5">
          <div> Enter your OTP</div>
          <input
            type="text"
            value={inputField.otp}
            onChange={(event)=>{handleOnchange(event,"otp")}}
            className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter OTP"
          />
        </div>
      }

      {otpValidate && 
        <div className="w-full mb-5">
          <div> Enter your New password</div>
          <input
            type="password"
            value={inputField.newPassword}
            onChange={(event)=>{handleOnchange(event,"newPassword")}}
            className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter New password"
          />
        </div>
      }

      <div
        className="bg-slate-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer hover:bg-white hover:text-black border-2"
        onClick={() => handleSubmit()}>{ contentVal}
      
        
      </div>
      {loader &&<Loader/>}
      <ToastContainer/>
    </div>
  );
};

export default ForgotPassword;
