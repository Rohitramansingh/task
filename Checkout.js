import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductItem from "./productItem";
import { clearCart, getCartItem, order } from "./Api";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Action } from "../Store/store";

export default function Checkout() {
  const isLogin = useSelector((state) => state.isLogin);
  const deleteitem = useSelector((state) => state.deleteitem);
  const [data, setData] = useState([]);

  const[phone,setPhone]=useState("")
  const[pincode,setPincode]=useState("")
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Action.closeModal());

    const fetch = async () => {
      if (isLogin) {
        const res = await getCartItem();
        console.log(res, "cartd");
        setData(res);
      }
    };

    fetch();
  }, [deleteitem]);

  const schema = Joi.object({
    Email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    Addressed: Joi.string().required(),
    Name: Joi.string().required(),
    State: Joi.string().required(),
    City: Joi.string().required(),
    Phone: Joi.string()
      .regex(/^\d{10}$/)
      .required().messages({"string.pattern.base":"Please enter 10 digit valid number"}),

    Pincode: Joi.string()
      .regex(/^\d{6}$/)
      .required()
      .required().messages({"string.pattern.base":"Please enter valid 6 digit pincode "}),

  });

  const pincodeChange=(e)=>{

    if(e.target.value.length<=6)
      {
        setPincode(e.target.value);

      }


  }

  const phoneChange=(e)=>{

    if(e.target.value.length<=10)
      {
        setPhone(e.target.value);

      }


  }

  const Back = () => {
    navigate("/");
  };
  console.log(data,"data")
  
  const sum=()=>{
    let total=0;
    data.map((val)=>{
      const price=Number(val.price*1);
      const qty=Number(val.quantity);
       total+=(price*qty)
    })
    return total;

  }
    
  const handlerChange = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd.entries());
    console.log(obj, "fd");
    const errors = schema.validate(obj, { abortEarly: false });
    if (errors.error) {
      console.log(errors,"errors")
      const newError = {};
      errors.error.details.forEach((detail) => {
        newError[detail.path[0]] = detail.message;
      });
      setError(newError);
    } else {
      try {
        const userid=localStorage.getItem('id');
        const objarr = { ...obj, item: data ,userid:userid};
        console.log(obj,"obj")
        const res = await order(objarr);


        const response=await clearCart();
        toast.success("order placed sucessfully");
        dispatch(Action.updateDelete())
        navigate("/myorder");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const eventChange = (e) => {
    setError("");
  };

  return (
    <div className="mt-20 w-[90%] h-[80%] shadow-md mx-auto  ">
      {isLogin && data.length !== 0 ? (
        <>
          <h1 className="bg-black p-4 text-start text-white text-xl font-bold my-3 ">
            Checkout
          </h1>
          <p className="text-start ml-6 p-1 w-[80%] font-bold my-2 ">
            Addressed
          </p>
          <main className=" grid  grid-cols-4">
            <div className="col-span-3 p-2  ">
              <form onSubmit={handlerChange} className=" space-y-3 ">
                <div className="flex justify-center" >
                  <TextField
                    onChange={eventChange}
                    name="Email"
                    type="text"
                    className="w-[80%] text-sm  "
                    id="outlined-basic"
                    label="Enter Email"
                    variant="outlined"
                  />
                </div>

                  {error.Email && (
                    <p className="text-xs text-red-500   flex w-[80%] mx-auto">
                      {error.Email}
                    </p>
                  )}



                <div className="flex justify-center ">
                  <TextField
                    onChange={eventChange}
                    name="Name"
                    type="text"
                    className="w-[80%] text-sm  "
                    id="outlined-basic"
                    label="Enter Name"
                    variant="outlined"
                  />
                </div>

                  {error.Name && (
                    <p className="text-xs text-red-500   flex w-[80%] mx-auto   ">
                      {error.Name}
                    </p>
                  )}

                <div className="flex justify-center">
                  <TextField
                    onChange={eventChange}
                    name="Addressed"
                    type="text"
                    className="w-[80%] text-sm  "
                    id="outlined-basic"
                    label="Enter Addressed"
                    variant="outlined"
                  />
                  </div>
                  {error.Addressed && (
                    <p className="text-xs text-red-500   flex w-[80%] mx-auto ">
                      {error.Addressed}
                    </p>
                  )}
              

                <div className="grid grid-cols-2 w-[80%]  gap-1 mx-auto  ">
                  <div>
                    <TextField
                      onChange={eventChange}
                      name="State"
                      type="text"
                      className=" text-sm  w-[100%]  "
                      id="outlined-basic"
                      label="Enter State"
                      variant="outlined"
                    />
                    {error.State && (
                      <p className="text-xs text-red-500   flex w-[100%] mx-auto ">
                        {error.State}
                      </p>
                    )}
                  </div>

                  <div>
                    <TextField
                      onChange={eventChange}
                      name="City"
                      type="text"
                      className=" text-sm w-[100%]  "
                      id="outlined-basic"
                      label="Enter city"
                      variant="outlined"
                    />
                    {error.City && (
                      <p className="text-xs text-red-500   flex w-[100%] mx-auto ">
                        {error.City}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 w-[80%]  gap-1 mx-auto   ">
                  <div className="w-[100%] ">
                    <TextField
                      onChange={phoneChange}
                      name="Phone"
                      type="Number"
                      value={phone}
                      className=" text-sm w-[100%]  "
                      id="outlined-basic"
                      label="Enter phone"
                      variant="outlined"
                    />

                    {error.Phone && (
                      <p className="text-xs text-red-500   flex w-[100%] mx-auto ">
                        {error.Phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <TextField
                      onChange={pincodeChange}
                      name="Pincode"
                      type="Number"
                      value={pincode}
                      className=" text-sm  w-[100%]  "
                      id="outlined-basic"
                      label="Enter pincode"
                      variant="outlined"
                    />
                    {error.Pincode && (
                      <p className="text-xs text-red-500   flex w-[100%] mx-auto  ">
                        {error.Pincode}
                      </p>
                    )}
                  </div>

                  <button className="w-[80% bg-black text-white p-1  ">
                    submit
                  </button>
                </div>
              </form>

              <billing className="  w-[80%]   mt-2 p-2">
                <p className="text-start ml-6 p-1 w-[80%] font-bold my-2  ">
                  Billing
                </p>
                {data.map((val) => {
                  return (
                    <p className="flex mx-auto  w-[80%] bg-gray-200 p-1 justify-between ">
                      <p className="mx-2 ">{val.name}</p>
                      <p className="mx-2 ">{`${val.quantity * val.price}`}</p>
                    </p>
                  );
                })}
                <div className=" flex justify-between p-1 w-[80%]  mx-auto  bg-black text-white ">
                  <p className="font-bold">Total</p>
                  <p className=" text-white font-bold">{sum()}</p>
                </div>
              </billing>
            </div>

            <div>
              <product className="space-y-3 h-[500px]    shadow-md overflow-y-scroll ">
                {data.map((val) => (
                  <ProductItem data={val} />
                ))}
              </product>
              {/* <button  onClick={handlerChange} className="p-1 w-[90%] my-2 bg-black text-white ">Order</button> */}
            </div>
          </main>
        </>
      ) : (
        Back()
      )}
    </div>
  );
}
