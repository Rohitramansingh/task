import React, { useEffect, useState } from "react";
import Order from "./Order";
import { getOrder } from "./Api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../Store/store";
import { toast } from "react-toastify";

export default function Myorder() {
  const [data, setData] = useState([]);
  const isLogin = useSelector((state) => state.isLogin);
  const updateDelete = useSelector((state) => state.deleteitem);
  const Additemupdate = useSelector((state) => state.Additemupdate);
  const Navigate = useNavigate();

  const dispatch=useDispatch();
  useEffect(() => {
    try {
      if (isLogin) fetch();
      else Navigate("/");
    } catch (error) {
      alert(error);
    }
  }, [isLogin, updateDelete, Additemupdate]);

 

  const fetch = async () => {

    try{
  const userid = localStorage.getItem("id");
      

      const res = await getOrder();
      console.log(res,"fetchorder")
      const find=res.filter((val)=>val.userid===userid)
      if(find)
        {

          setData(find);
        }

    }catch(error)
    {
      toast.error(error);
    }

  };

  return (
    <div className="mt-20  border bg-slate-700  ">
      <p className="text-start text-white p-2 mt-3 ml-3 ">Order Histroy</p>
      {data.length === 0 ? (
        <p className="text-white p-3 ">No order yet </p>
      ) : (
        <main className=" p-5  ">
          {data && data.map((val) => <Order data={val} />)}
        </main>
      )}
    </div>
  );
}
