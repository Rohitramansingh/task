import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../Store/store";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCartItem } from "./Api";
import BasicMenu from "./DropDown";

export default function Navbar(){
    const [search,setSearch]=useState("");
   
    const navigate=useNavigate();
    const isLogin=useSelector(state=>state.isLogin)
    const len=useSelector(state=>state.cartList)
    const dispatch=useDispatch();
    const img1="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
  

 



    function inputChange(e){
        setSearch(e.target.value);
        dispatch(Action.search({data:e.target.value.toLowerCase()}))


    }

    dispatch(Action.userExist())

    const logout=()=>{
     dispatch(Action.logout())
    }

    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

    const dropdown= <div className="relative">
      <img src={img1}
        
        onClick={toggleDropdown}
        className={` bg-white hover:bg-gray-400 w-[40px] h-[40px] rounded-md focus:outline-none focus:bg-gray-400 `}
      >

      </img>
      {isOpen && (
        <div className="absolute  mt-5  w-48 bg-white border rounded-md shadow-lg z-10">
          <ul>
            { isLogin && <Link to="/profile" ><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >Profile</li></Link>}
          { isLogin &&   <Link to="/myorder"> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Myorder </li>   </Link>  }
            <li onClick={logout}className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>

    return(
        <div className="flex justify-between p-4 border bg-white fixed border-black mb-5  z-50 shadow-lg items-centerfixed top-0 w-[100vw] md:bg-green-400 ">
            <heading className="flex space-x-3 ml-2 ">
                <button onClick={Back}><ArrowBackIcon/></button>
                <div className=" font-bold text-blue-800 flex items-center">Shopcart</div>
            </heading>

            <div className="w-[50%] flex bg-gray-200 p-2  ">
                <input name="search" onChange={inputChange} value={search}className="bg-gray-200 w-[100%]  h-[100%] outline-none " placeholder="search " type="text"/>
            </div>

            <menu className="mr-5 space-x-5  grid grid-cols-3 ">
                <div className="flex  items-center w-[40px] ">
                {isLogin ? <BasicMenu/> :  <p onClick={Login}>Login</p>  }

                </div>

               <p className=" mr-1 flex items-center "> <Link to="/">Home</Link></p>

            <button onClick={openModel} className="  "><ShoppingCartIcon/>[{len?.length}]</button>
            </menu>

        </div>
    ) 
}