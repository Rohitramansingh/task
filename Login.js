import { Input, TextField } from "@mui/material";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Action } from "../Store/store";
import { getUser, singup } from "./Api";
import { toast } from "react-toastify";
export default function Login() {
  const [error, setError] = useState("");
  const [login, setLogin] = useState(true);
  const [found, setFound] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    Repassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userdata);
  dispatch(Action.userExist());

  const loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(3)
      .max(15)
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/),
    // Repassword: Joi.string(),
  });

  const singSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(3)
      .max(15)
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/),
      Repassword: Joi.any().equal(Joi.ref('password'))
      .required()
      .messages({ 'any.only': 'Password and confirm password must be same' })
  });

  const handlerEventChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });

    setError("");
  };

  //

  const validatLogin = (data) => {
    const errors = loginSchema.validate(data, { abortEarly: false });
    return errors;
  };

  const validatsing = (data) => {
    const errors = singSchema.validate(data, { abortEarly: false });
    return errors;
  };

  const SettingError = (errors) => {
    const newErrors = {};
    errors.error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });

    setError(newErrors);
  };

  const getLogin = async (obj) => {
    try {
      const response = await getUser(obj);
      if (response === null) {
        setFound(true);
        return;
      } else {
        console.log("kkk", response);
        localStorage.setItem("id", response.id);
        dispatch(Action.User({ data: response }));
        dispatch(Action.login({ data: response.cartdata }));
          toast.success("User Login Successfully")
        navigate("/");
      }
    } catch (error) {
      toast.error("user not found");
    }
  };

  const getSingUp = async (obj) => {
    try {
      const response = await singup(obj);
      if (response === "exist") {
        toast.warning("user exist Already");
        return;
      }
      toast.success("user register  Sucessfully");
      setLogin(!login);
    } catch (error) {
      toast.error("unable to registered user");
    }
  };
  const submit = async (e) => {
    e.preventDefault();

    let errors = "";

    if (login) {
      const { password, email } = userData;
      errors = validatLogin({ password, email });
      if (errors.error) {
        SettingError(errors);
        return;
      } else {
        const obj = { password, email };
        await getLogin(obj);
      }
    } else {
      // singup
      errors = validatsing(userData);
      if (errors.error) {
        SettingError(errors);
        return;
      } else {
        console.log("get")
        getSingUp(userData);
      }
    }

    //
  };

  const img1 =
    "https://img.freepik.com/free-photo/vertical-banners-sales-promo_23-2150653391.jpg?size=626&ext=jpg&ga=GA1.1.1528879502.1717563140&semt=ais_user";

  const img2 =
    "https://media.istockphoto.com/id/905301022/photo/login-screen-username-and-password-in-internet-browser-on-computer-screen.jpg?s=612x612&w=0&k=20&c=OiAiRvZD7mii0Rga5KHOm4VoQJ2_amE6OBb8vRMjneA=";

  return (
    <div className="grid grid-cols-2 p-1   gap-1 w-[60vw] mx-auto  border border-black  h-[500px]  mt-20">
      <div>
        <img className="w-[90%] h-[100%] " src={img2} />
      </div>

      {/* col2 */}
      <div className=" shadow-sm p-1 ">
        <h1 className="text-lg font-bold  mt-7 p-1 ">{`${
          login ? "Login" : "Singup"
        }`}</h1>
        <div className=" mt-10 space-y-7 ">
          <div>
            <TextField
              type="text"
              name="email"
              value={userData.email}
              onChange={handlerEventChange}
              className="w-[80%] text-sm  "
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
            />
            {error.email && (
              <p className="text-red-500 flex text-xs w-[80%] mx-auto ">
                {error.email}
              </p>
            )}
          </div>

          <div>
            <TextField
              type="text"
              name="password"
              onChange={handlerEventChange}
              value={userData.password}
              className="w-[80%] text-sm  "
              id="outlined-basic"
              label="Enter password"
              variant="outlined"
            />
            {error.password && (
              <p className="  text-red-500 flex text-xs w-[80%] mx-auto  ">
                {error.password}
              </p>
            )}
          </div>

          <div>
            {!login && (
              <>
                <TextField
                  type="text"
                  name="Repassword"
                  value={userData.Repassword}
                  onChange={handlerEventChange}
                  className="w-[80%] text-sm  "
                  id="outlined-basic"
                  label="Enter confirm Password"
                  variant="outlined"
                />

                {error.Repassword && (
                  <p className="  text-red-500 flex text-xs w-[80%] mx-auto  ">
                    {error.Repassword}
                  </p>
                )}
              </>
            )}
          </div>

          <button
            onClick={submit}
            className="w-[80%] bg-black  p-1 text-white  "
          >
            Submit
          </button>
        </div>

        <div className="mt-4 space-y-2 ">
          {found && (
            <p className="text-red-500  text-sm text-start ">user not found</p>
          )}

          <p className="text-sm">OR </p>

          <button onClick={()=>setLogin(!login)} className="">
            {`${login? 'Singup' :'login'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
