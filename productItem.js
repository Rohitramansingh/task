import React from "react";
import { deleteCart } from "./Api";
import { useDispatch } from "react-redux";
import { Action } from "../Store/store";
export default function ProductItem(props){

   const dispatch=useDispatch();

const Delete=async()=>{
   await deleteCart(props.data.id)
   dispatch(Action.updateDelete())
}
return(
    <div className=" border w-[90%] shadow-sm h-fit lg:p-2    p-5 relative ">
       <div className="flex space-x-1 justify-around p-2 lg:block  ">
        <img className="w-[150px] lg:w-[90%] lg:h-[70%] lg:mx-auto  " src={props.data.image}/>
        <div className="space-y-3 my-3 lg:my-1 lg:space-y-1 lg:mt-2 ">
        <p className=" text-sm font-bold ">{props.data.name} </p>
        <p className=" text-sm font-bold ">{props.data.price} </p>
        <p className=" text-sm font-bold ">Qty  : {props.data.quantity} </p>
           

        </div>
       </div>

       <button onClick={Delete} className="absolute right-2 bottom-2  p-1 text-xs  hover:text-red-500  bg-black text-white ">Remove</button>
    </div>
)
}