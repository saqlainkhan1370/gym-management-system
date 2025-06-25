import React, {  useState } from "react";
import "./signup.css";
import Modal from "../Modal/modal";
import ForgotPassword from "../ForgotPassword/forgotPassword";
import axios from "axios";

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer,toast } from "react-toastify";




const Signup = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [inputField, setInputFeild] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqP8S2QP9rYDDIRlWvju7Di2-B9mAWz5g2Yw&s",
  });
  const [loaderImage,setloaderImage]=useState(false)

  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };

  const handleOnchange = (event, name) => {
    setInputFeild({ ...inputField, [name]: event.target.value });
  };
  
  const uploadImage = async (event) => {

    setloaderImage(true)
    console.log("image uploading");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    //dii1txtl0

    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dii1txtl0/image/upload",
        data
      );
      console.log(response);
      const imageUrl = response.data.url;
      setloaderImage(false)
      setInputFeild({ ...inputField, ["profilePic"]: imageUrl });
    } catch (err) {
      console.log(err);
      setloaderImage(false)
    }
  };

    const handleRegister = async()=>{
      await axios.post('http://localhost:4000/auth/register',inputField).then((resp)=>{
        const successMsg =resp.data.message;
        toast.success(successMsg)
      }).catch(err =>{
                      const errorMessage = err.response.data.error
                      toast.error(errorMessage)
          
          console.log(err)
      
           })
    }


  return (
    <div className="w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-fit overflow-y-auto">
      <div className="font-sans text-white text-center text-3xl">
        Register Your GYM
      </div>
      <input
        type="text"
        value={inputField.email}
        onChange={(event) => {
          handleOnchange(event, "email");
        }}
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter Email"
      />
      <input
        type="text"
        value={inputField.gymName}
        onChange={(event) => {
          handleOnchange(event, "gymName");
        }}
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter GYM Name"
      />
      <input
        type="text"
        value={inputField.userName}
        onChange={(event) => {
          handleOnchange(event, "userName");
        }}
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Username"
      />
      <input
        type="password"
        value={inputField.password}
        onChange={(event) => {
          handleOnchange(event, "password");
        }}
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Password"
      />
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
        className="w-full mb-30 p-2 rounded-lg"
      />
        {
          loaderImage &&
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="secondary" />
        
      </Stack>
        }

      <img
        src={inputField.profilePic}
        alt="gym"
        className="mb-10 h-[200px] w-[250px]"
      />

      <button className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
      onClick={handleRegister} > Register</button>
      

      <button
        className="p-2 mt-5 w-[60%] border-2 bg-slate-600 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={setForgotPassword}
      >
        Forgot Password
      </button>

      {forgotPassword && (
        <Modal
          header="Forgot Password"
          handleClose={setForgotPassword}
          content={<ForgotPassword />}
        />
      )}
      <ToastContainer/>
    </div>
  );
};

export default Signup;
