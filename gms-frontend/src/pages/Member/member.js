import React, { useState, useEffect } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Modal from "../../components/Modal/modal";
import MemberCard from "../../components/MemberCard/memberCard";
import Addmembership from "../../components/Addmembership/addmembership";
import Addmembers from "../../components/AddMembers/addmembers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Member = () => {
  const [addMembership, setAddmembership] = useState(false);
  const [addmember, setAddMember] = useState(false);

  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(9);
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const [noOfPage, setNoOfPage] = useState(0);

  useEffect(() => {
    fetchData(0, 9);
  }, []);

  const fetchData = async (skip, limits) => {
    await axios
      .get(
        `http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        let totalData = response.data.totalMembers;
        setTotalData(totalData);
        setData(response.data.members);

        let extraPage = totalData % limit === 0 ? 0 : 1;
        let totalPage = parseInt(totalData / limit) + extraPage;
        setNoOfPage(totalPage);

        if (totalData === 0) {
          setStartFrom(-1);
          setEndTo(0);
        } else if (totalData < 10) {
          setStartFrom(0);
          setEndTo(totalData);
        }
      })
      .catch((err) => {
        toast.error("Technical fault");
        console.log(err);
      });
  };

  const handleMemberShip = () => {
    setAddmembership((prev) => !prev);
  };
  const handleMembers = () => {
    setAddMember((prev) => !prev);
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      let currpage = currentPage - 1;
      setCurrentPage(currpage);
      var from = (currpage - 1) * 9;
      var to = currpage * 9;
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip - 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPage) {
      let currpage = currentPage + 1;
      setCurrentPage(currpage);
      var from = (currpage - 1) * 9;
      var to = currpage * 9;
      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip + 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);
      await axios
        .get(
          `http://localhost:4000/members/searched-members?searchTerm=${search}`,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          setData(response.data.members);
          setTotalData(response.data.totalMembers);
        })
        .catch((err) => {
          toast.error("Technical fault");
          console.log(err);
        });
    } else {
      if (isSearchModeOn) {
        window.location.reload();
      } else {
        toast.error("please enter any value");
      }
    }
  };

  return (
    <div className="text-black p-5 w-3/4 h-[100vh]">
      {/* Block for banner */}
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <div
          className="border-2 px-3 py-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black flex items-center gap-2"
          onClick={() => handleMembers()}
        >
          Add Member <FitnessCenterIcon />
        </div>
        <div
          className="border-2 px-3 py-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black flex items-center gap-2"
          onClick={() => handleMemberShip()}
        >
          Membership <AddIcon />
        </div>
      </div>

      {/* Block for back to dashboard button */}
      <Link
        to="/dashboard"
        className="flex items-center mt-3 text-blue-500 hover:underline"
      >
        <ArrowBackIcon /> Back to Dashboard
      </Link>

      {/* Search bar */}
      <div className="mt-5 w-1/2 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="border-2 w-full p-2 rounded-lg"
          placeholder="Search By Name or Mobile No"
        />
        <div
          onClick={() => {
            handleSearchData();
          }}
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          <SearchIcon />
        </div>
      </div>
      {/* Total Members Section */}
      <div className="mt-5 text-xl text-slate-900 flex justify-between items-center">
        <div>Total Members{!isSearchModeOn ? totalData : null}</div>
        {!isSearchModeOn ? (
          <div className="flex items-center gap-3">
            <div>
              {startFrom + 1} - {endTo} of {totalData} Members
            </div>
            <div
              className={` w-8 h-8 cursor-pointer border-2 flex items-centers justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                currentPage === 1 ? "bg-gray-200 text-gray-400" : null
              }`}
              onClick={() => {
                handlePrev();
              }}
            >
              {" "}
              <ChevronLeftIcon />
            </div>
            <div
              className={` w-8 h-8 cursor-pointer border-2 flex items-centers justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  ${
                currentPage === noOfPage ? "bg-gray-200 text-gray-400" : null
              }`}
              onClick={() => {
                handleNext();
              }}
            >
              <ChevronRightIcon />
            </div>
          </div>
        ) : null}
      </div>
      <Link
        to="/specific/monthly"
        onClick={() => sessionStorage.setItem("func", "monthlyJoined")}
        className="mt-5 inline-block border px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:text-black"
      >
        View Monthly Joined Members
      </Link>

      <div className=" bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">
        {data.map((item, index) => {
          return <MemberCard item={item} />;
        })}
      </div>
      {addMembership && (
        <Modal
          header="Add Membership"
          handleClose={handleMemberShip}
          content={<Addmembership handleClose={handleMemberShip} />}
        />
      )}
      {addmember && (
        <Modal
          header={"Add New Members"}
          handleClose={handleMembers}
          content={<Addmembers />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Member;
