import React, { useState } from "react";
import { Field, Formik, useFormik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, Select, Slider, TextField } from "@mui/material";
import { userSchema } from "./User_Schema";
import Paper from '@mui/material/Paper';
import BasicModal from "./Modal";
export default function Form() {
    const document = ["addhar"];
    const url = "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/aadhar-card-download-by-name.jpg"
    const [img, setImg] = useState("/");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div >
            {open && <BasicModal open={open} handleOpen={handleOpen} name="Addhar card" handleClose={handleClose} img={url} />}
            <Paper className="w-[70%] mx-auto p-5 " elevation={4}>
                <div>
                    <h1 className="bg-amber-700 text-white p-3  ">Personal Details</h1>
                    <div className=" grid-cols-2 p-3 bg-amber-200 gap-1   mt-5 border ">
                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">FirstName</p>
                            <Paper className="p-2 col-span-3 " >Rohit</Paper>
                        </div>

                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">LastName</p>
                            <Paper className="p-2 col-span-3 " >Rohit</Paper>
                        </div>

                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">Age</p>
                            <Paper className="p-2 col-span-3 " >22</Paper>
                        </div>

                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">Email</p>
                            <Paper className="p-2 col-span-3 " >rohit@gmail.com</Paper>
                        </div>

                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">Gender</p>
                            <Paper className="p-2 col-span-3 " >Male</Paper>
                        </div>

                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">AddharCard Number</p>
                            <Paper className="p-2 col-span-3 " >123456789456</Paper>
                        </div>

                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">Phone </p>
                            <Paper className="p-2 col-span-3 " >Rohit</Paper>
                        </div>

                        <div className="p-2  grid grid-cols-4 ">
                            <p className="font-semibold text-[15px] m-1 ">Occupation</p>
                            <Paper className="p-2 col-span-3 " >Student</Paper>
                        </div>




                    </div>

                </div>



                <div className="mt-4">
                    <h1 className="bg-amber-700 text-white p-3  ">Addressed Details</h1>
                    <div className="grid grid-cols-2 p-3 bg-amber-200 gap-1 mt-5 border ">
                        <div className="p-2  col-span-2 ">
                            <p className="font-semibold text-[15px] m-1 col-span-1 ">Addressed</p>
                            <Paper className="p-2  col-span-3" >lig 18 raksha nagar ramjhi jabalpur </Paper>
                        </div>

                        <div className="p-2   ">
                            <p className="font-semibold text-[15px] m-1 ">Country</p>
                            <Paper className="p-2 " >India</Paper>
                        </div>

                        <div className="p-2   ">
                            <p className="font-semibold text-[15px] m-1 ">State</p>
                            <Paper className="p-2 " >Madhaya pradesh</Paper>
                        </div>

                        <div className="p-2   ">
                            <p className="font-semibold text-[15px] m-1 ">City</p>
                            <Paper className="p-2 " >Jabalpur</Paper>
                        </div>

                        <div className="p-2   ">
                            <p className="font-semibold text-[15px] m-1 ">Pincode</p>
                            <Paper className="p-2 " >22222</Paper>
                        </div>




                    </div>

                </div>



                <div className="mt-4">
                    <h1 className="bg-amber-700 text-white p-3  ">Education Details</h1>
                    <div className="bg-white">
                        <p className="font-semibold mt-4 px-3  ">10Th Standard</p>

                        <div className="grid grid-cols-3 p-3 bg-amber-200 gap-1 mt-5 border ">
                            <div className="p-2  col-span-3 ">
                                <p className="font-semibold text-[15px] m-1 col-span-1 ">School Name</p>
                                <Paper className="p-2  col-span-3" >lig 18 raksha nagar ramjhi jabalpur </Paper>
                            </div>

                            < div className="p-2   ">
                                <p className="font-semibold text-[15px] m-1 ">Percentage %</p>
                                <Paper className="p-2 " >80%-90%</Paper>
                            </div>

                            < div className="p-2   ">
                                <p className="font-semibold text-[15px] m-1 ">Passout year</p>
                                <Paper className="p-2 " >2019</Paper>
                            </div>

                            < div className="p-2   ">
                                <p className="font-semibold text-[15px] m-1 ">Medium</p>
                                <Paper className="p-2 " >English</Paper>
                            </div>






                        </div>
                    </div>



                    <div className="bg-white">
                        <p className="font-semibold mt-4 px-3 ">12Th Standard</p>

                        <div className="grid grid-cols-3  p-3 bg-amber-200 gap-1 mt-5 border ">
                            <div className="p-2  col-span-3 ">
                                <p className="font-semibold text-[15px] m-1 col-span-1 ">School Name</p>
                                <Paper className="p-2  col-span-3" >lig 18 raksha nagar ramjhi jabalpur </Paper>
                            </div>

                            < div className="p-2   ">
                                <p className="font-semibold text-[15px] m-1 ">Percentage %</p>
                                <Paper className="p-2 " >80%-90%</Paper>
                            </div>

                            < div className="p-2   ">
                                <p className="font-semibold text-[15px] m-1 ">Passout year</p>
                                <Paper className="p-2 " >2019</Paper>
                            </div>

                            < div className="p-2   ">
                                <p className="font-semibold text-[15px] m-1 ">Medium</p>
                                <Paper className="p-2 " >English</Paper>
                            </div>
                        </div>



                        {/* collage  */}


                        <div className="bg-white">
                            <p className="font-semibold mt-4 px-3 "> Highest Qualification</p>

                            <div className="grid grid-cols-3 p-3 bg-amber-200 gap-1 mt-5 border ">
                                <div className="p-2  col-span-3 ">
                                    <p className="font-semibold text-[15px] m-1 col-span-1 ">School Name</p>
                                    <Paper className="p-2  col-span-3" >lig 18 raksha nagar ramjhi jabalpur </Paper>
                                </div>

                                < div className="p-2   ">
                                    <p className="font-semibold text-[15px] m-1 ">Percentage %</p>
                                    <Paper className="p-2 " >80%-90%</Paper>
                                </div>

                                < div className="p-2   ">
                                    <p className="font-semibold text-[15px] m-1 ">Passout year</p>
                                    <Paper className="p-2 " >2019</Paper>
                                </div>

                                < div className="p-2   ">
                                    <p className="font-semibold text-[15px] m-1 ">Medium</p>
                                    <Paper className="p-2 " >English</Paper>
                                </div>

                            </div>
                        </div>



                    </div>



                    <div className="mt-4">
                        <h1 className=" bg-amber-700 text-white p-3  ">Document</h1>
                        <div className="  bg-amber-200  p-4 gap-2 mt-5 border grid grid-cols-3 ">



                            {
                                document.map((val) => {
                                    <div className="border" onClick={handleOpen}>
                                        <img src={url} className="" />
                                        <p className="mx-1">{val}</p>
                                    </div>

                                })
                            }


                        </div>

                    </div>




                </div>
            </Paper>
        </div>
    )

}