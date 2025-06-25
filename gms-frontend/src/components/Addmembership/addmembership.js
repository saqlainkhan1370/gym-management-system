import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';


const Addmembership = ({handleClose}) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);

  const handleOnchange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
    console.log(inputField);
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get('http://localhost:4000/plans/get-membership', 
        {
        withCredentials: true,
      });
  
      console.log(res);
  
      if (res.data && Array.isArray(res.data.membership)) {
        setMembership(res.data.membership);
        toast.success(res.data.membership.length+"membership fetched")
      } else {
        console.warn("Unexpected data format:", res.data);
        setMembership([]);
      }
    } catch (err) {
      console.log(err);
      toast.error("something got happened")
    }
  };
  

  useEffect(() => {
    fetchMembership();
  }, []);


  const handleAddmembership=async()=>{
    await axios.post('http://localhost:4000/plans/add-membership',inputField,{withCredentials:true}).then((response=>{
      toast.success(response.data.message)
      handleClose();
    })).catch(err =>{
      console.log(err);
      toast.error("something got happened")
    })

  }





  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {Array.isArray(membership) && membership.length > 0 ? (
          membership.map((item, index) => (
            <div
              key={index}
              className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              <div>{item.months} Months Membership</div>
              <div>RS {item.price}</div>
            </div>
          ))
        ) : (
          <div>No membership plans available</div>
        )}
      </div>

      <hr className="mt-10 mb-10" />

      <div className="flex gap-10 mb-10">
        <input
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          value={inputField.months}
          onChange={(event) => handleOnchange(event, "months")}
          type="number"
          placeholder="Add No.of Months"
        />

        <input
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          value={inputField.price}
          onChange={(event) => handleOnchange(event, "price")}
          type="number"
          placeholder="Add Price"
        />

        <div onClick={()=>{handleAddmembership()}} className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          ADD+
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Addmembership;

