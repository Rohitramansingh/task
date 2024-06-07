import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../Store/store";
import Cart from "./Cart";
export default function Navbar(){
    const [search,setSearch]=useState("");
    const length=useSelector(state=>state.length)
    const navigate=useNavigate();
  const isLogin=useSelector(state=>state.isLogin)
  const dispatch=useDispatch();




    function inputChange(e){
        setSearch(e.target.value);
        dispatch(Action.search({data:e.target.value.toLowerCase()}))
        

    }
    function Back(){
        navigate(-1);
    }

    function  handler()
    {
        dispatch(Action.search({data:search}))
        
    }

    const openModel=()=>{
        dispatch(Action.openModal())

    }

    const Login=()=>{
      if(isLogin)
        {
          dispatch(Action.logout())
        }else{
            navigate('/login')
        }
    }

    return(
        <div className="flex justify-between p-2 border bg-white  border-black mb-5  z-50 shadow-lg fixed top-0 w-[100%] ">
            <heading className="flex space-x-3 ml-2 ">
                <button onClick={Back}><ArrowBackIcon/></button>
                <div className=" font-bold text-blue-800 mt-2">Shopcart</div>
            </heading>

            <div className="w-[50%] flex   ">
                <input name="search" onChange={inputChange} value={search}className="bg-gray-200 w-[100%] p-1 h-[100%] outline-none " placeholder="search " type="text"/>
                <button onClick={handler}><SearchIcon/></button>
            </div>

            <menu className="mr-5 space-x-3 ">
                <button onClick={Login}>{`${isLogin ? "Logout" :"Login"}`}</button>
                <Link to="/">Home</Link>
                
            <button onClick={openModel} className="border border-black p-2 "><ShoppingCartIcon/>[{length}]</button>
            </menu>

        </div>
    ) 
}