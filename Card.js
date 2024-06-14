import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { Action } from "../Store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PostToCart, getCartData } from "./Api";
import { toast } from "react-toastify";
import StarIcon from "@mui/icons-material/Star";

export default function Card(props) {
  const dispatch = useDispatch();
  const rating = [];
  const isLogin = useSelector((state) => state.isLogin);
  dispatch(Action.userExist());

  const userdata = useSelector((state) => state.userdata);
  console.log("isLogin", isLogin);
  for (let i = 0; i < 5; i++) {
    if (i < props.data.rating) {
      const elemnt = (
        <p className="text-yellow-500  ">
          <StarIcon />
        </p>
      );
      rating.push(elemnt);
    } else {
      const elemnt = (
        <p className="text-gray-500 h-[10px] ">
          <StarIcon />
        </p>
      );
      rating.push(elemnt);
    }
  }

  


  const addCart = async (e) => {
    try {
      if (isLogin) {
        await PostToCart({ data: props.data });
        toast.success("item added sucessfully");
        dispatch(Action.updateAdditem());
      } else {
        dispatch(Action.LocalStroage({data:props.data,count:1})) 
        
        toast.warning("please login first");

        // localStorage.removeItem("cid")
       
      }
    } catch (error) {
      toast.error(error);



    }
  };

  let cartActive = " absolute right-1 bottom-0  bg-green-200 ";
  let cartnonActive = "absolute right-1 bottom-0  ";
  return (
    <div className="w-[250px] h-[300px]  border p-1 relative rounded-lg   ">
      <Link to={`/details/${props.data.id}`}>
        <img
          className=" w-[90%] h-[75%]   hover:duration-100 hover:transition-transform hover: ease-out  hover:w-[100%] "
          src={props.data.image}
        />
      </Link>
      <p>{props.data.name}</p>
      <price>{props.data.price}</price>
      <div className="flex justify-between p-1 mb-1 ">
        <div className="flex ">{rating && rating.map((val) => val)}</div>

        <button onClick={addCart} className=" w-[20px]">
          <ShoppingCartOutlinedIcon />
        </button>
      </div>
    </div>
  );
}
