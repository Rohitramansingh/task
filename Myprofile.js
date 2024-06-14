import { Class } from "@mui/icons-material";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "./Api";
import { useSelector } from "react-redux";
export default function Edit() {

  const isLogin=useSelector(state=>state.isLogin);
  




  const img1 =
    "data:image/jpeg;base64,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";
     

    const [data,setdata]=useState([])
    const navigate=useNavigate();


    useEffect(() => {
      const fetch = async () => {
        const uid = localStorage.getItem("id");
        const res = await getProfileData(uid);
        const obj = res[0];
        if (res.length !== 0) {
          setdata(obj);
        }
      };
      try {

        if(isLogin)
        fetch();
      else
      navigate("/")
      } catch (error) {
        alert(error);
      }
    }, []);

    const gotoEdit=()=>{
      navigate('/edit')
    }

    console.log(data.files,"files")
  return (
    <div className=" grid grid-cols-2 mt-20 p-5 w-[80%] gap-x-5 mx-auto border border-black  ">
      <div className="h-[90vh] bg-gray-100 p-3 ">
        <div className="border border-black bg-slate-700  text-white p-2  ">
          <first className="  bg-gray-300  w-[100%] h-[250px ">
            <img
              className=" w-[100px] h-[100px] mx-auto mt-[-30px]  rounded-full "
              src={img1}
              // src={`./Picture/${data.files}`}
            />
          </first>

          <p className="text-start font-bold mr-2 ">{data.fullname}</p>
          <p className="text-start ">hello i am  from india </p>
            <p className="flex justify-end  p-2 ">


             
              <button onClick={gotoEdit} className="border p-1 hover:bg-gray-200 hover:text-black  w-[100px]  text-xs ">Edit</button>
            </p>
        </div>

        <div>
          <div className="border border-black bg-gray-100 text-start p-2 my-2 space-y-2 ">
            <p className="text-start my-3 ">Personal information </p>

            <div>
              <p className="font-bold text-sm ">Full Name </p>
              <p className="bg-white p-1 text-sm border ">{data.fullname}</p>
            </div>

            <div>
              <p className="font-bold text-sm ">Gender</p>
              <p className="bg-white p-1 text-sm border ">{data.gender}</p>
            </div>

            <div>
              <p className="font-bold text-sm ">Email </p>
              <p className="bg-white p-1 text-sm border ">{data.email}</p>
            </div>

            <div>
              <p className="font-bold text-sm ">Phone </p>
              <p className="bg-white p-1 text-sm border ">{data.phone}</p>
            </div>

            <div>
              <p className="font-bold text-sm ">Designation </p>
              <p className="bg-white p-1 text-sm border  ">Developer</p>
            </div>
          </div>
        </div>
      </div>

      <second className="p-3 my-3 bg-white  space-y-2 ">
        <div className=" bg-gray-200 space-y-2  ">
          <p className="pt-3 "> Bio</p>
          <p className="text-sm text-left p-1 ">
            Create an HTML div element that would serve as the file upload
            container and parent div, inside the newly created div add a heading
            3 tag this should display a placeholder when the component first
            renders then the name of the uploaded file on input change
            afterwards create a paragraph tag it content will hold
          </p>
        </div>

        <div className="bg-gray-100 p-4  space-y-2 ">
          <p className="text-start my-3  ">Adressed Details </p>

          < div className="text-start ">
            <p className="font-bold text-sm ">Adressed </p>
            <p className="bg-white p-1 text-sm border ">lig 18 raksha nagar ranjhi jabalpur </p>
          </div>
               
            

              < div className="text-start ">
            <p className="font-bold text-sm ">State </p>
            <p className="bg-white p-1 text-sm border "> {data.state} </p>
          </div>

          < div className="text-start ">
            <p className="font-bold text-sm ">City </p>
            <p className="bg-white p-1 text-sm border ">{data.city} </p>

                </div>
                
                < div className="text-start ">
            <p className="font-bold text-sm ">Pincode </p>
            <p className="bg-white p-1 text-sm border ">{data.pincode} </p>

                </div> 
         


        </div>
      </second>
    </div>
  );
}
