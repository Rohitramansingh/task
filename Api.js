import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../Store/store";
import axios from "axios";
import { legacy_createStore } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const PostToCart = async ({ data }) => {
  const user = localStorage.getItem("id");
  try {
    const { data: userData } = await axios.get(
      `http://localhost:8000/users/${user}`
    );

    const existingItemIndex = userData.cartdata.findIndex(
      (item) => item.id === data.id
    );

    if (existingItemIndex !== -1) {
      userData.cartdata[existingItemIndex].quantity += 1;
    } else {
      userData.cartdata.push({ ...data, quantity: 1 });
    }
    console.log(userData, "uuu");

    const response = await axios.put(
      `http://localhost:8000/users/${user}`,
      userData
    );

    console.log((response, "respon"));

    if (!response.statusText) {
      throw new Error("Error updating data");
    }
  } catch (error) {
    toast("Error: " + error.message);
    throw new Error(error);
  }
};

export const detailCart = async ({ count, data }) => {
  try {
  const user = localStorage.getItem("id");

    const { data: userData } = await axios.get(
      `http://localhost:8000/users/${user}`
    );
    const existingItemIndex = userData.cartdata.findIndex(
      (item) => item.id === data.id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity by one
      userData.cartdata[existingItemIndex].quantity =
        parseInt(count) + userData.cartdata[existingItemIndex].quantity;
    } else {
      // If the item doesn't exist, push the new data
      userData.cartdata.push({ ...data, quantity: count });
      
    }

    const response = await axios.put(
      `http://localhost:8000/users/${user}`,
      userData
    );

    if (!response.statusText) {
      throw new Error("Error updating data");
    }
  } catch (error) {
    console.error("Error:", error.message);
    toast.error("Error: " + error.message);
  }
};

export const getOrder = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/orders`)
    console.log(res, "order");




    if (!res.statusText) {
      throw new Error("unable to get your data");
    }

  

    return res.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw new Error(error);
  }
};

export const deleteCart = async (id) => {
  try {
    const userid = localStorage.getItem("id");
    const res = await axios.get(`http://localhost:8000/users/${userid}`);

    const find = res.data.cartdata.filter((val) => val.id !== id);
    const obj = { ...res.data, cartdata: find };
    console.log(obj, "obj");

    const response = await axios.put(
      `http://localhost:8000/users/${userid}`,
      obj
    );

    if (!response.statusText) throw new Error("unable to delete item");
  } catch (error) {
    toast.error(error);
    throw new Error(error);
  }
};

export const getProduct = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8000/product/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error);
    throw new Error(error);
    console.log(error);
  }
};

export const getUser = async (data) => {
  try {
    const res = await axios("http://localhost:8000/users");
  
    const { email, password } = data;
    
    const find = res.data.find(
      (val) => val.email === email && val.password === password
    );
    console.log(find,"getUser")

    return find;
  } catch (error) {
    toast.error("something went wrong");
    throw new Error(error);
  }
};

export const getCartItem = async () => {
  try {
    const id = localStorage.getItem("id");
    const res = await axios.get(`http://localhost:8000/users/${id}`);
    console.log(res, "response");
    return res.data.cartdata;
  } catch (error) {
    toast.error(error);
  }
};

export const singup = async (data) => {
  try {

    const exist=await getUser(data);
    console.log("get",exist )


    if(exist)
      {
        return "exist"
      }

    const obj = { ...data, cartdata: [] };
    const res = await axios.post("http://localhost:8000/users", obj);

    if (!res.statusText) throw new Error("unable to registered user");

    toast.success("user register successfully");
    return;
  } catch (error) {
    toast.error(error);
    return null;
  }
};

export const order = async (data) => {
  try {
  // const id=  localStorage.get("id");
  console.log("order");

    // const newdata={...data,userid:id}
    const res = await axios.post("http://localhost:8000/orders", data);
    console.log(res, "post order");
    if (!res.statusText) {
      throw new Error("unable to order an item ");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const ProfileUpdate = async (data) => {
  try {
    const pid = localStorage.getItem("pid");
    const find = await axios.put(`http://localhost:8000/profile/${pid}`, data);
    if (!find.statusText) throw new Error("cannot update profile");

    console.log(find, "query");
  } catch (error) {
    throw new Error(error);
  }
};

export const Profile = async (data) => {
  try {
    const find = await axios.post(`http://localhost:8000/profile`, data);

    if (find.OK) throw new Error("unable to creat your profile");

    const res = await axios.get(`http://localhost:8000/profile`);

    if (res.OK) throw new Error("unable to creat your profile");

    const uid = localStorage.getItem("id");
    const arr = res.data.find((val) => val.userid === uid);
    localStorage.setItem("pid", arr.id);

    console.log(localStorage.getItem("pid"));
  } catch (error) {
    throw new Error(error);
  }
};

export const getProfileData = async (uid) => {
  try {
    const res = await axios.get(`http://localhost:8000/profile`);
    console.log(res, "awit");

    if (res.OK) throw new Error("unable to creat your profile");

    const find = res.data.filter((val) => val.userid === uid);

    if (find.OK) throw new Error("unable to creat your profile");

    return find;
  } catch (error) {
    throw new Error(error);
  }
};

export const DeleteOrder = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8000/orders/${id}`);
    if (!res.statusText) throw new Error("unable to delte item");
  } catch (error) {
    throw new Error(error);
  }
};



export const Increment=async (itemid)=>{

  const id=localStorage.getItem("id");
    try{
      const { data: userData } = await axios.get( `http://localhost:8000/users/${id}`);
    const index=userData.cartdata.findIndex((val)=>val.id===itemid)
    userData.cartdata[index].quantity+=1;

    const response = await axios.put(
      `http://localhost:8000/users/${id}`,
      userData
    );

    if(!response.statusText)
      throw new Error("something went wrong")



      
    }catch(error)
    {
      throw new Error(error);
    }
}

export const Decrement=async (itemid)=>{

  const id=localStorage.getItem("id");
    try{
      const { data: userData } = await axios.get( `http://localhost:8000/users/${id}`);
    const index=userData.cartdata.findIndex((val)=>val.id===itemid)

    if(userData.cartdata[index].quantity<=1)
      return
    
    userData.cartdata[index].quantity-=1;

    const response = await axios.put(
      `http://localhost:8000/users/${id}`,
      userData
    );

    if(!response.statusText)
      throw new Error("something went wrong")



      
    }catch(error)
    {
      throw new Error(error);
    }
}

export const saverating=async({count,id})=>{
  const userid=localStorage.getItem("id");
  try{
    const { data: userData } = await axios.get( `http://localhost:8000/product/${id}`);
    
      
     

   


  
      userData.rating=count;


      const response = await axios.put(
        `http://localhost:8000/product/${id}`,
        userData
      );
      console.log(response,"text")

      if(!response.statusText)
        throw new Error("something went wrong")
        
    

  }catch(error)
  { throw new Error(error)}


}


export const clearCart=async ()=>{
  const userid=localStorage.getItem("id");

try{
  const { data: userData } = await axios.get( `http://localhost:8000/users/${userid}`);
  userData.cartdata=[];

  const response = await axios.put(
    `http://localhost:8000/users/${userid}`,
    userData
  );


}catch(error)
{
  throw  new Error("unable to clean the cart item")
}
 


}






