import React  from "react"
import img1 from "../components/assert/Headphone/headphone2.jpeg"
import DeleteIcon from '@mui/icons-material/Delete';



import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Action } from "../Store/store";
import { useDispatch, useSelector } from "react-redux";



export default function Item(props){

    const arr=useSelector(state=>state.cartList);

    const isLogin=useSelector(state=>state.isLogin)
    const find=arr.find((val)=>val.id===props.data.id)



  



  const dispatch=useDispatch();

  const deleteItem=()=>{

    if(window.confirm("Are you sure to remove this item"))
        {

            dispatch(Action.DeleteItem({id:props.data.id}))
        }
  }

    const increment=()=>{
        dispatch(Action.Increment({id:props.data.id}))
      }
      
      const decrement=()=>{
        dispatch(Action.Decrement({id:props.data.id}))

          
      }

    return(
        <div className="grid grid-cols-8 gap-1 mx-1 my-1  p-1 bg-white  ">
            <img src={img1} className="w-[100px]  "/>
            <p className="col-span-2 ">{props.data.name}</p>
            <p>{props.data.price}</p>

            <cart className="  ">
                  <div className="flex space-x-1 justify-center w-[100%] border  p-1 ">
                  <button onClick={increment}className=" w-[35%]   hover:bg-blue-950 hover:text-white"><AddIcon/></button>

                <h1 className="w-[30%] mt-3 font-bold ">{find.quantity} </h1>
                <button onClick={decrement}className=" w-[30%]  hover:bg-blue-950 hover:text-white"><RemoveIcon/></button>

               
                 
            </div>
                  </cart>


            <p className="p-1 ">{props.data.price * props.data.quantity}</p>
            <p onClick={deleteItem}><DeleteIcon/></p>
            
        </div>

    )
}