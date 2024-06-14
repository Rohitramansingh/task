import React, { useEffect, useState } from "react";
import { Input, TextField } from "@mui/material";
import { object } from "joi";
import { Profile, ProfileUpdate, getProfileData } from "./Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Edit() {
  const [data, setdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    pincode: "",
    city: "",
    image: "",
    bio: "",
  });

  const[file,setFile]=useState("")
  useEffect(() => {
    const fetch = async () => {
      const uid = localStorage.getItem("id");
      const res = await getProfileData(uid);
      const obj = res[0];
      console.log(obj, "profiledata");
      if (res.length !== 0) {
        setdata(obj);
      }
    };
    try {
      fetch();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  console.log(data, "data");

  const navigate=useNavigate();

  const fileChange=(e)=>{
    setFile(e.target.files[0])
     
  }

  const handlerEvent = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd.entries());

    const newobj = { ...obj, userid: localStorage.getItem("id"),files:file.name};
    console.log(newobj,"newobj")

    const pid = localStorage.getItem("pid");
    try {
      if (pid === null) {
        const res = await Profile(newobj);
        toast.success("profile is updated")
      } else {
        const res = await ProfileUpdate(newobj);
        toast.success("profile is updated")

      }
    } catch (error) {
      toast.error(error);
    }
    try {
      const res = await Profile(newobj);
    } catch (error) {
      toast.error(error);
    }

     navigate('/profile')
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  let states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
  ];
  return (
    <div className="mt-20 w-[70%] p-6 ">
      <form
        className="w-[100%] bg-gray-100 space-y-2  "
        onSubmit={handlerEvent}
      >
        <TextField
          onChange={changeHandler}
          value={data.fullname}
          className="w-[80%] bg-white"
          type="text"
          name="fullname"
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
        />
        <TextField
          onChange={changeHandler}
          value={data.email}
          className="w-[80%]  bg-white"
          name="email"
          id="outlined-basic"
          label="Email Adressed"
          variant="outlined"
        />
        <div>
          <TextField
            onChange={changeHandler}
            value={data.phone}
            className="w-[80%]  bg-white"
            type="Number"
            name="phone"
            id="outlined-basic"
            label="Phone"
            variant="outlined"
          />
        </div>
        <div className="w-[80%]   grid grid-cols-2 mx-auto space-x-2  p-2 border border-black   ">
          <select
            className="bg-white p-2 "
            onChange={changeHandler}
            name="gender"
            value={data.gender}
          >
            <option value=" Male ">Male</option>
            <option value="Female  ">Female</option>
            <option value="  other">other</option>
          </select>

          <select onChange={changeHandler} name="state" value={data.state}>
            {states.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        </div>

        <TextField
          onChange={changeHandler}
          value={data.city}
          className="w-[80%]  bg-white"
          name="city"
          id="outlined-basic"
          label="city"
          variant="outlined"
        />
        <TextField
          onChange={changeHandler}
          value={data.pincode}
          className="w-[80%]  bg-white"
          name="pincode"
          id="outlined-basic"
          label="pincode"
          variant="outlined"
        />
        <p className="text-start w-[80%] mx-auto "> Upload profile photo </p>

        <input
          type="file"
          className="w-[80%]  bg-white"
          name="image"
          id="outlined-basic"
          label="Enter password"
          variant="outlined"
          onChange={fileChange}
        />

        <textarea
          onChange={changeHandler}
          value={data.bio}
          name="bio"
          placeholder="description .... "
          className="w-[80%] mx-auto "
        ></textarea>

        <button className="save bg-black text-white w-[80%] mx-auto p-2 ">
          Save
        </button>
      </form>
    </div>
  );
}
