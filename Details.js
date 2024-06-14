import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

// import img1 from "/"
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Action } from "../Store/store";
import { useStepContext } from "@mui/material";
import axios from "axios";
import {
  PostToCart,
  detailCart,
  getCartData,
  getProduct,
  saverating,
} from "./Api";
import { toast } from "react-toastify";
import { ContactlessOutlined } from "@mui/icons-material";

export default function Details() {
  const [arr, setArr] = useState([]);
  const [data, setdata] = useState("");
  const params = useParams();
  const userdata = useSelector((state) => state.userdata);
  const cartList = useSelector((state) => state.cartList);

  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const isLogin = localStorage.getItem("id");

  dispatch(Action.userExist());

  const navigate = useNavigate();
  const star = (
    <p className="text-gray-500 h-[10px] ">
      <StarIcon />
    </p>
  );
  const [stars, setStart] = useState([star, star, star, star, star]);

  let activeArr = [false, false, false, false, false];

  const getActiveStar = (arr) => {
    let count = 0;
    console.log(arr, "arr");
    for (let i = 0; i < arr.length; i++) {
      count += arr[i] ? 1 : 0;
    }

    return count;
  };

  const Rating = async (n) => {
    const check = activeArr[n];
    if (check) {
      for (let i = n; i < 5; i++) activeArr[i] = false;
    } else {
      for (let i = n; i >= 0; i--) activeArr[i] = true;
    }

    let rating = [];

    for (let i = 0; i < 5; i++) {
      if (activeArr[i]) {
        const elemnt = (
          <p className="text-yellow-500  ">
            {" "}
            <StarIcon />{" "}
          </p>
        );
        rating.push(elemnt);
      } else {
        const elemnt = (
          <p className="text-gray-500  ">
            {" "}
            <StarIcon />
          </p>
        );
        rating.push(elemnt);
      }
    }

    let count = 0;
    count = getActiveStar(activeArr);
    
    try {
      const res = await saverating({ count: count, id: data.id });
    } catch (error) {
      toast.error("something went wrong");
    }

    setStart(rating);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProduct(params.id);
        console.log("lll", res);
        // const find=res.data.find((val)=>val.id===params.id)
        setdata(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  const myOrder = () => {
    if(!isLogin)
      {
        toast.warning("please login first")
        return;
      }

    if(cartList.length===0)
      {
        toast.warning("please Add some item in cart")
      }else{

        navigate("/checkout");
      }
  };
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  console.log(data, "dddd");

  const addtoCart = async () => {
    try {
      if (isLogin) {
        const obj = { ...data };
        console.log(obj, "ooo");
        await detailCart({ data: obj, count: count });
        dispatch(Action.updateAdditem());
        toast.success("item added successfully");
      } else {
        toast.warning("please login first");
      }
    } catch (error) {
      toast.error("unable to add the item");
    }
  };

  return (
    <div className="w-[90%] mx-auto border shadow-md   mt-24  bg-gray-100  p-5 ">
      <div className="grid grid-cols-2 bg-white ">
        {/* col1 */}

        <img src={data.image} className=" w-[90%] p-2 " />

        {/* col2 */}

        {/* col2 */}
        <div className="relative space-y-2 ">
          <p className="text-start font-bold  my-2 text-xl ">{data.name}</p>
          <p className="text-start font-bold ">{data.description}</p>

          <p className="text-left text-sm p-1  ">
            1.8" LCD display Bluetooth Calling Smartwatch with AI voice
            assistance Noise Health SuiteTM: Blood Oxygen, 24*7 Heart rate
            monitor, Stress Monitor and Sleep Monitor 60 Sports mode & 100+
            watch faces
          </p>
          <p className="border border-b-gray-300 w-[90%] "></p>

          <div className="flex justify-between items-center w-[90%] ">
            <cart className=" ">
              <div className="flex space-x-1 justify-center items-center  w-[150px] bg-gray-100 p-2 ">
                <button
                  onClick={increment}
                  className=" w-[40%]   hover:bg-blue-950 hover:text-white"
                >
                  <AddIcon />
                </button>

                <h1 className="w-[40%]  font-bold ">{count}</h1>
                <button
                  onClick={decrement}
                  className=" w-[40%]  hover:bg-blue-950 hover:text-white"
                >
                  <RemoveIcon />
                </button>
              </div>
            </cart>

            <p className="font-bold my-2  text-start  "> ₹ {data.price}</p>
          </div>

          <rating className="flex  items-center  py-4  ">
            {stars.map((val, index) => (
              <p onClick={() => Rating(index)} className="">
                {val}
              </p>
            ))}
          </rating>

          <div className="  flex space-x-3 absolute bottom-1 right-2  ">
            <button
              onClick={addtoCart}
              className="w-[150px] border border-black bg-yellow-500 p-1 "
            >
              Cart
            </button>
            <button
              onClick={myOrder}
              className="w-[150px] border border-yellow-500 hover:bg-orange-500 p-1 "
            >
              order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
