import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import { DeleteOrder } from "./Api";
import { toast } from "react-toastify";
import { Action } from "../Store/store";

export default function Order(props) {

  const [list,setList]=useState([]);
  const [data,setData]=useState([])
  const dispatch=useDispatch();

  const deleteOrder=async ()=>{

    try{
    const res=await DeleteOrder(props.data.id)
    dispatch(Action.updateDelete())
    toast.success("item deleted successfully ")

   

    }catch(error)
    {
      toast.error(error)
    }
  }

  useEffect(()=>{

    
    setList(props.data.item)
    const obj={
        Addressed:props.data.Addressed,
        State:props.data.State,
        City:props.data.City,
        Pincode:props.data.Pincode,
          // Date:props.data.Date
    }

    setData(obj)

  },[props])

  console.log(list, "list");
    
  return (
    <div  className="w-[90%]  p-7 border  bg-white my-3 relative  shadow-md">
        <div  className="flex justify-end space-x-3 mr-8  ">
        <p className="text-end ">25/10/2024 </p>


        </div>
        <button  onClick={deleteOrder} className="w-[100px p-1  text-black font-bold w-[50px] bg-gray-200 absolute top-0 right-0  hover:text-red-500 mt-3 "><ClearIcon/></button>


    <div className="grid grid-cols-4   bg-white p-4 ">
      {/* col 1 */}
    
      <div className="col-span-3 ">

        {list?.length>0 &&
          list.map((val) => {
            return (
              <div className="grid grid-cols-3 p-2 w-[90%] shadow-lg border ">
                <img className="w-[100px] h-[100px] " src={val.image} />
                <p className="my-5 ">{val.name}</p>
                <p className="my-5 ">{val.price}</p>
              </div>
            );
          })}
      </div>

      {/* col2  */}
      <div>

      <p className="my-2 p-1 text-start font-bold ">Delivery Addressed</p>
       
      <div className=" border p-1 my-2 lg:p-2 lg:text-sm  ">
          <p className="text-start ">{data.Addressed}</p>
          <p className="text-start">{data.Pincode}</p>
          <p className="text-start">{data.City}</p>
          <p className="text-start">{data.State}</p>
            
      </div>


      <p className="my-2 p-1 text-start font-bold  ">Delivery Addressed</p>

        <price> 
            {list && list.map((val)=>{
                return(
                 <div className="flex justify-between bg-gray-200 lg:p-1 " >
                      <p>{val.name}</p>
                       <p>{val.price}</p>

                 </div>
                  

                )
            })}

            <div className="bg-black text-white p-1 flex justify-between ">
              <p>Total</p>
              <p>250</p>
            </div>
         
        </price>
      </div>
    </div>

   
    </div>

  );
}
