import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

import MemberCard from '../../components/MemberCard/memberCard';
import { getMonthlyJoined,threeDayExpire ,fourToSevenDayExpire,expired,inActiveMembers} from './data';

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = sessionStorage.getItem('func');
    
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    switch (func) {
      case "monthlyJoined":
        setHeader("Monthly Joined Member");
        var datas = await getMonthlyJoined();
        console.log("Monthly Joined Response:", datas); // ✅ LOG HERE
        setData(datas.members);
        break;

      case "threeDayExpire":

        setHeader("Expiring In 3 Days Members");
        var datas =await threeDayExpire();
        setData(datas.members);
        break;

      case "fourToSevenDayExpire":
        setHeader("Expiring In 4-7 Days Members");
        var datas =await fourToSevenDayExpire();
        setData(datas.members);
        break;

      case "expired":
        setHeader("Expired Members");
        var datas =await expired();
        setData(datas.members);
        break;

      case "inActiveMembers":
        setHeader("Inactive Members");
        var datas =await inActiveMembers();
        setData(datas.members);
        break;

      default:
        setHeader("Inactive Members");
        break;
    }
  };

  return (
    <div className='text-black p-5 w-3/4 flex-col'>
      <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
        <Link to={'/dashboard'} className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className='mt-5 text-xl text-slate-900'>
        {header}
      </div>

      <div className='bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto h-[80%]'>
        {
          data.length > 0 ? (
            data.map((item, index) => (
              <MemberCard key={index} item={item} />
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">
              No members found.
            </div>
          )
        }
      </div>
    </div>
  );
};

export default GeneralUser;

