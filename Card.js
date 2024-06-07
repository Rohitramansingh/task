import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Action } from "../Store/store";
import { useDispatch, useSelector } from "react-redux";
export default function Card(props) {
  console.log(props.data, "propdata");
  const dispatch = useDispatch();
   const cartCheck=useSelector(state=>state.cartList)
   const cartIndex=cartCheck.findIndex((val)=>val.id===props.data.id)
  const rating = [];
  const isLogin=useSelector(state=>state.isLogin)
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

  const addCart = () => {
    if(isLogin)
      {

        dispatch(Action.AddCart({ id: props.data.id, count: 1 }));
      }else{
        dispatch(Action.opentLoginModal());
      }
  };

  let cartActive=" absolute right-1 bottom-0  bg-green-200 ";
  let cartnonActive="absolute right-1 bottom-0  "
  return (
    <div className="w-[200px] h-[300px]  border p-1 relative rounded-md  ">
      <Link to={`/details/${props.data.id}`}>
        <img
          className=" w-[100%] h-[75%]"
          // src="https://plus.unsplash.com/premium_photo-1674582717310-a0299ca7d0e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"/>
          src={props.data.image}
        />
      </Link>
      <p>{props.data.name}</p>
      <price>{props.data.price}</price>
      <div className="flex ">{rating && rating.map((val) => val)}</div>

      <button onClick={addCart} className={cartIndex!==-1 && isLogin ? cartActive :cartnonActive}>
        <ShoppingCartOutlinedIcon />
      </button>
    </div>
  );
}
