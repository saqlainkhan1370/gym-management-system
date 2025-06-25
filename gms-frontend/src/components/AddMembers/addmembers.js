import React, { useState,useEffect } from "react";
import axios from "axios";

import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer,toast } from "react-toastify";


const Addmembers = () => {
  const [inputField, setInputFeild] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAAAwMDDo6Oj09PTR0dHv7+/s7OxSUlLf39/T09Pm5ua2trbY2Nj4+Pjc3NyTk5MWFhbBwcGMjIxCQkJaWlrHx8dhYWGhoaFpaWkPDw8nJydERERNTU2qqqp7e3tycnKGhoYhISGwsLB4eHg5OTkuLi4iIiKioqIZGRkhbe73AAAFyElEQVR4nO2d61biMBCABQSKsoigXFcBdVXe/wXXG0ubJpPJbZLZM9+/Pacp+Sykmcwke3EhCIIgCIIgCIIgCIIgCIIgCIJQNP1p1eVFNe07+I1vOxy5HSP9BlXurnpTDTCCvU3ufgaw6SGeIM9v6Ilb+1Pk+xX9prIJjnP3MBjbcLPN3cFgtrBgP3f/IgC/F+e5uxeBOWh4l7t7EfgNGnJ+F57YgIa5excFMWyyHI96JTMa34cZzsCry2AWYrgg6mQYqiJ4sfIVJepiKA/ehhy+o588ehteEvUwlMV/b9gXwxpiWCZiWEcMy0QM65Rl2Fus9uvlcn0Y/wKvY2p4+V5fUnl6ARaYWBoOdx2VrXGazNFw1fL7pBrpr+ZnOPytFfzgUXv9FTdDpcMNdogG4M1LMFRiIYW1pgUzw1+goPYp8jKcWAR1v0Vehu3FwRY3ahtWhpj85YPaiJPhBJW/VJOgnAyfMYKdrtKKkyEyBa2sVDMytL0pTigvRUaGU6ShIsHI8A/WsBlKKY8e/Ii8hva3/YnmW5+PIfZn2Om8QO3Az8hrCM+569w32vExbOU6jTSnNWJYJ68h/lvarM/7Hw25/g6v0YaHRjs+hvhynmZ0wcgQXb7bDIIZGSolB0Zum80YGQ6QhkqB5Q0fQ8wqzSfK2jcnQ1yNslrJxMkQ9xDVxTZWhkpntRwsjcAPyG6ICPO3E7UNL0O1DK9Na0E4j+FkMd3t58+onVYKlmp6TZ40h+Hq+HOLF8RWK4WBMXv4ybOmBb1hr/4Y3Es4J8DkTVvTS27Ya97Fo0rVNNz8GWovpzacvGL+7jA3use4WZmuJjZctrp25XGXhep4nBqHrRGtoW7r1LXPja5XtSFnt2i9Bc/QGuqzR/rfj53RbPxBH7D7uorS0DB1fvVVREFpODRtDbuzPIYgCA0n5tQKvGcuDELD9jB65t7e3Bc6Q3gH6t5XwAqZoa2OohXXxYLKECpH+2YaogFAZDhEHMagLy0MhsgQlaHGnj7iBo3hGiOYaEcjiSF6I7/LOTlYKAwdjtNoL7MEQ2CIWQM88eQVaICkN7x0EOx0tvDy1Gx3v353m6greUfwWj9DcOmozSswC1/8VLY5zQ6SG+7dBDUFov+YI66hN9TvjQAxzcLrM3frYUFkhvgSkRq6ivuLYbdxDX6vfFpDl2G0hq7iXo2e90UYXvoeu9SahWteqdjhJqmhNY9i5L15I+0iMDIYSWnoPIzWeETc6N30wVSGHsNojfMStjkZo0vEEBp6DaM1dj+v/jFweBMm65HMUJkOejnOrvqPXfASRDCipIKiGXoPo47Ae4BTGvoPo45Yg5FEhu2NuqmwnmeZxjBsGHXjzTIgJDHEF7vGwJL1SGGo3DM5cCyVwHDyRif3DRhoJDBElhDGZE9qeKDSqgMEGsPmleGGuG2Q0TEHGrEN7RmYRBgDjciG+C0D0TEFGnENgUR2egyBRlxDKJGdHn3tUVTDA5WLAW2gEdMw/4HmuiNqIhoWcNz3URNoxDM01gNR8tSehcczhJcbqGgHGtEM8w6jZ1pZj1iG6OMAkqMGGsp2KV/D/MPoGSWxE8cQv1eegmagEcXQLZGdnkagEcWwuP80oR5oxDBE1gNRUiuvimBYzjBa4xxohBuGZmAS8S+jEWwYIQOThlN5Vajh4Ngples4hmQZGHfeejEMQxLZyel+dVF5WTsaUmZgPOgGGxY6jJ55CDT0rAeiZBliOKHPwHiwDzF0LKvMxE7ptoNhgbNRLYfmPx0MmSKG/BFD/oghf8SQP2LIHzHkjxjyRwz5I4b8EUP+iCF/QMMSCtdC2YCGxZVceACfuYU+oqRg5qBhAQWkwVi2ZBLtmkzIFhYsqj7PD+tBTejD+wvFfpzGAHFkV8FY95t+0OP8TtygDmYeZNh7F4kKe7r2mOc39ehyGlx/WnV5UU1TnJMmCIIgCIIgCIIgCIIgCIIgCIIQkb/DOnjjNsAtOwAAAABJRU5ErkJggg==",
    joiningDate: "",
  });
  
  const[imageLoader,setImageLoder]=useState(false)
  const[membershipList,setMembershipList] = useState([])
  const[selectedOption,setSelectedOption] = useState("");

  const handleOnchange = (event, name) => {
    setInputFeild({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);

  const uploadImage = async (event) => {
    setImageLoder(true)
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
      setInputFeild({ ...inputField, ["profilePic"]: imageUrl });
      setImageLoder(false)
    } catch (err) {
      console.log(err);
      setImageLoder(false)
    }
  };

  const fetchMembership = async()=>{
    await axios.get('http://localhost:4000/plans/get-membership',{withCredentials:true}).then((response)=>{

    setMembershipList(response.data.membership)
    if(response.data.membership.length==0){
      return toast.error("no any membership addded yet",{
        className:"text-lg"
      })
    }else{
      let a =response.data.membership[0]._id;
      setSelectedOption(a)
      setInputFeild({...inputField,membership:a})
    }

   

    }).catch(err =>{
      console.log(err);
      toast.error("something wrong happeneds")
    })
  }





  useEffect(()=>{
    console.log(inputField)
     fetchMembership();
  },[])


   const handleOnchangeSelect =(event)=>{
    let value = event.target.value;
    setSelectedOption(value)
    setInputFeild({...inputField,membership:value})
   }


   const handleRegisterButton = async()=>{
    await axios.post('http://localhost:4000/members/register-member',inputField,{withCredentials:true}).then((res)=>{
      toast.success("added successfully");
      setTimeout(()=>{
        window.location.reload();
      },2000)

    }).catch(err =>{
      console.log(err);
      toast.error("something wrong happeneds")
    })
   }





  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          value={inputField.name}
          onChange={(event) => {
            handleOnchange(event, "name");
          }}
          placeholder="name of the joinee"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.mobileNo}
          onChange={(event) => {
            handleOnchange(event, "mobileNo");
          }}
          placeholder="Mobile no"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.address}
          onChange={(event) => {
            handleOnchange(event, "address");
          }}
          placeholder="Enter Address"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.joiningDate}
          onChange={(event) => {
            handleOnchange(event, "joiningDate");
          }}
          type="Date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select value={selectedOption} onChange={handleOnchangeSelect}className="border-2 w-[90%] border-slate-400 rounded-md placeholder:text-gray">
         {
          membershipList.map((item,index)=>{
            return(
              <option key={index} value={item._id}>{item.months} months Membership</option>
            );
          })
         }
        </select>
        <input type="file" onChange={(e) => uploadImage(e)} />

        <div className="w-1/4">
          <img
            src={inputField.profilePic}
            className="w-full h-full rounded-full"
          />
          {
            imageLoader && <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
          }
        </div>

        <div onClick={()=>handleRegisterButton()}  className="p-3 border-2 w-28 text-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Addmembers;
