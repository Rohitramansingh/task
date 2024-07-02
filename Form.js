import React from "react";
import { Field, Formik, useFormik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, FormControlLabel, FormGroup, MenuItem, Select, Slider, TextField } from "@mui/material";
import { userSchema } from "./User_Schema";
export default function Form() {

    const initialvalues = {
        firstname: "",
        lastname: "",
        email: "",
        addressed: "",
        phone: "",
        language: [],
        gender: "",
        state: "",



    }



    const formik = useFormik({
        initialValues: initialvalues,
        validationSchema: userSchema,
        onSubmit: (value) => {
            console.log(value, "form");
        }
    })

    const { handleChange, touched, handleBlur, handleSubmit, errors } = formik



    return (
        <div>
            <h1 className="text-center ">Formik form</h1>
            <form onSubmit={handleSubmit} className="w-[70%]  mx-auto border border-black bg-slate-600 p-5 ">

                <div>
                    <h1 className=" ">Personal details</h1>
                    <div className=" md:grid gap-4 grid-cols-2 space-y-5 md:space-y-1
                    ">
                        <div className="space-y-2">
                            <p className="mx-1 p-0 text-white">first Name</p>
                            <TextField id="name"
                                name="firstname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.firstname}

                                className="w-full outline-none bg-white  " variant="outlined" />
                            {errors.firstname && touched.firstname && <p className="text-xs text-red-500 mx-1 ">{errors.firstname} </p>}

                        </div>

                        <div className="space-y-2">
                            <p className="mx-1 text-white ">Last Name</p>
                            <TextField id="name"
                                name="lastname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.lastname}

                                className="w-full outline-none bg-white  " variant="outlined" />
                            {errors.lastname && touched.lastname && <p className="text-xs text-red-500 mx-1 ">{errors.lastname} </p>}


                        </div>

                        <div className="space-y-2 col-span-2 ">
                            <p className="mx-1 text-white "> Email</p>
                            <TextField id="name"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.email}

                                className="w-full  outline-none bg-white  " variant="outlined" />
                            {errors.email && touched.email && <p className="text-xs text-red-500 mx-1 ">{errors.email} </p>}


                        </div>

                        <div className="space-y-2 col-span-2 ">
                            <p className="mx-1 text-white "> Addressed</p>
                            <TextField id="name"
                                name="addressed"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.addressed}

                                className="w-full  outline-none bg-white  " variant="outlined" />
                            {errors.addressed && touched.addressed && <p className="text-xs text-red-500 mx-1 ">{errors.addressed} </p>}


                        </div>

                        <div className="space-y-2">
                            <p className="mx-1 text-white ">Gender</p>
                            <Select
                                name="gender"
                                className="w-full bg-white"


                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.gender}
                            >
                                <MenuItem value={"male"}>male</MenuItem>
                                <MenuItem value={"female"}>female</MenuItem>
                                <MenuItem value={"other"}>other</MenuItem>
                            </Select>
                            {errors.gender && touched.gender && <p className="text-xs text-red-500 mx-1 ">{errors.gender} </p>}


                        </div>


                        <div className="space-y-2">
                            <p className="mx-1 text-white">State</p>
                            <TextField id="name"
                                name="state"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.state}

                                className="w-full outline-none bg-white  " variant="outlined" />
                            {errors.state && touched.state && <p className="text-xs text-red-500 mx-1 ">{errors.state} </p>}


                        </div>


                        <div className="space-y-2">
                            <p className="mx-1 text-white ">Phone</p>
                            <TextField id="name"
                                name="phone"
                                type="Number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.phone}

                                className="w-full outline-none bg-white  " variant="outlined" />
                            {errors.phone && touched.phone && <p className="text-xs text-red-500 mx-1 ">{errors.phone} </p>}


                        </div>


                        <div className="space-y-2">
                            <p className="mx-1 text-white ">Addhar Number</p>
                            <TextField id="name"
                                name="addhar"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // value={formik.values.firstname}
                                placeholder="Enter 12 digit Number"

                                className="w-full outline-none bg-white  " variant="outlined" />
                            {errors.addhar && touched.addhar && <p className="text-xs text-red-500 mx-1 ">{errors.addhar} </p>}


                        </div>



                        <div className="space-y-2">
                            <p className="mx-1 text-white ">Language Know</p>

                            <div className="border w-full bg-white p-3   ">
                                <div className="flex space-x-2">
                                    <input  type="checkbox" name="language" onChange={handleChange} value="English" />
                                    <p className="text-white">English</p>
                                </div >

                                <div className="flex space-x-2">
                                    <input  type="checkbox" name="language" onChange={handleChange} value="Hindi" />
                                    <p className="text-white">Hindi</p>
                                </div >

                                <div className="flex space-x-2">
                                    <input  type="checkbox" name="language" onChange={handleChange} value="Gujarati" />
                                    <p className="text-white">Gujarati</p>
                                </div >
                            </div>

                            {errors.language && touched.language && <p className="text-xs font-bold text-red-500 mx-1 ">{errors.language} </p>}

                        </div>












                    </div>

                </div>

                <div className="col-span-2 flex justify-end py-2 ">
                    <button className="bg-yellow-800  border px-4 py-2  text-white">Submit</button>
                </div>


            </form>


        </div>

    )
}