import { Input, TextField } from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Action } from "../Store/store";
export default function Login()
{
    const [isLogin ,setLogin]=useState(true)
    const [error ,setError]=useState("")
    const [found,setFound]=useState(false);
    const [data,setData]=useState({
        email:"",
        password:"",
        Repassword:""
    })
   const logintdata=useSelector(state=>state.login)
   const navigate=useNavigate();
   const dispatch=useDispatch();

  const schema=Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password:Joi.string()
    .min(3)
    .max(15)
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/),
    Repassword:Joi.string()
  })

  const eventHandler=(e)=>{
    setFound(false);
    setError(false)
    const{name,value}=e.target;

    setData((prev)=>{return {...prev,[name]:value}})
  }

    const  handlerChange=(e)=>
    {
        e.preventDefault();
     const fd=new FormData(e.target)
     const obj=Object.fromEntries(fd.entries());
     const objs={email:"",password:"",Repassword:""};
       setData(objs)

     

     const errors = schema.validate(obj, { abortEarly: false });
     console.log(errors,"error");

     if(errors.error)
        {
            const newErrors = {};
            errors.error.details.forEach(detail => {
              newErrors[detail.path[0]] = detail.message;
            });
            
            setError(newErrors);
            return;
        
        }else{

            if(isLogin)
                {
                const find=logintdata.findIndex((val)=>val.email===obj.email && val.password===obj.password)
                if(find===-1)
                    {
                       setFound(true);
                    }else{
                      navigate('/')
                      dispatch(Action.login())
                    }
                }else{
                    // singup

                    

                    dispatch(Action.singUp({data:obj}))
                    alert("user register  Sucessfully")
                    setLogin(true);
                    
                }

        }


     console.log(obj,"obj")
    }

    const toggleLogin=()=>{
     setLogin(prev=>!prev)
     const obj={email:"",password:"",Repassword:""};

     setData(obj)
    }

    return(
        <div className="grid grid-cols-2 p-1  gap-1 w-[60vw] mx-auto  border border-black  h-[500px]  mt-20">
            <div>
                 <img className="w-[90%] h-[60%] " src="https://img.freepik.com/free-photo/vertical-banners-sales-promo_23-2150653391.jpg?size=626&ext=jpg&ga=GA1.1.1528879502.1717563140&semt=ais_user"
                 />
            </div>


            {/* col2 */}
            <div className=" shadow-sm p-1 ">
                <h1 className="text-lg font-bold  mt-7 p-1 ">{`${isLogin ? "Login" :"Singup"}`}</h1>
                <form className=" mt-10 space-y-7 " onSubmit={handlerChange}>
                    <div>
                    <TextField type="text" name="email" value={data.email} onChange={eventHandler}  className="w-[80%] text-sm  " id="outlined-basic" label="Enter Email" variant="outlined" />
                { error.email && <p className="text-red-500 w-[80%] text-xs pr-16   ">{error.email}</p>}

                    </div>
              
                   <div>
                   <TextField   type="text"   name="password" onChange={eventHandler}  value={data.password} className="w-[80%] text-sm  " id="outlined-basic" label="Enter password" variant="outlined" />
                { error.password && < p  className="text-red-500 w-[80%] text-xs mt-1 pr-16  ">{error.password}</p>}

                   </div>
             


             { !isLogin &&    
             <TextField   type="text"  onChange={eventHandler}   name="Repassword" value={data.Repassword}  className="w-[80%] text-sm pb-3  " id="outlined-basic" label="confirm password" variant="outlined" />
                 
                 

            }
                    <button className="w-[80%] bg-black  p-1 text-white  ">Submit</button>
                     
                </form>

                <div className="mt-4 space-y-2 ">
              {found  && <p className="text-red-500  text-sm text-start ">user not found</p>}

                <p className="text-sm">OR </p>
                      <button onClick={toggleLogin} className="text-sm ">{`${isLogin ?'singup' :'login'}`}</button>

                </div>


            </div>
        </div>
    )
}