import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Action } from "../Store/store";
import { Decrement, Increment, deleteCart } from "./Api";
import { useDispatch, useSelector } from "react-redux";

export default  function Item(props) {
  console.log(props.datas, "aaa");
  const dispatch=useDispatch();

  const isLogin=useSelector(state=>state.isLogin)

  const deleteItem = () => {
   props.onSelect(props.datas.id)
  };

  const increment =async () => {

    if(isLogin)
      {

    await Increment(props.datas.id)

    dispatch(Action.updateDelete())
  }else{
    dispatch(Action.LoacalStorageIncrement(props.datas.id))
  }

  };

  const decrement = async () => {

    if(isLogin)
      {

        await Decrement(props.datas.id)
        dispatch(Action.updateDelete())
      }else{
        dispatch(Action.LoacalStorageDecrement(props.datas.id))
      }

  };

  return (
    <div className="grid grid-cols-8 gap-1 mx-1 my-1  p-1 bg-white  ">
      <img src={props.datas.image} className="w-[90%] h-[90% ] flex items-center" />
      <p className="col-span-2 flex items-center text-center justify-center ">{props?.datas?.name}</p>
      <p className="text-center flex items-center justify-center ">{props?.datas?.price}</p>

      <cart className="flex items-center file:">
        <div className="flex space-x-1 justify-center w-[100%] border  p-1 ">
          <button
            onClick={increment}
            className=" w-[35%]   hover:bg-blue-950 hover:text-white"
          >
            <AddIcon />
          </button>

          <h1 className="w-[35%]  flex justify-center align-middle text-center font-bold ">{props?.datas?.quantity} </h1>
          <button
            onClick={decrement}
            className=" w-[35%]  hover:bg-blue-950 hover:text-white"
          >
            <RemoveIcon />
          </button>
        </div>
      </cart>

      <p className="p-1 text-center flex items-center justify-center ">{props?.datas?.price * props?.datas?.quantity}</p>
      <p className="text-center  flex items-center justify-center " onClick={deleteItem}>
        <DeleteIcon />
      </p>

    </div>
  );
}
