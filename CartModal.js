import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../Store/store";
import Item from "./Item";
import axios from "axios";
import { DeleteLocalStorage, deleteCart, getCartData, getCartItem } from "./Api";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function BasicModal() {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(Action.openModal());
  const cartdata = useSelector((state) => state.cartList);
  const updatedelete = useSelector((state) => state.deleteitem);
  const updateAdd= useSelector((state) => state.Additemupdate);

  const handleClose = () => dispatch(Action.closeModal());
  const modalValue = useSelector((state) => state.Modal);

  const isLogin = useSelector((state) => state.isLogin);

  const [data, setdata] = React.useState(cartdata);

  const navigate =useNavigate();

   console.log(updatedelete,"updatedelete")


 

   const deleteItem = async (id) => {
    alert("are sure to  remove this item from cart")

    if(isLogin)
      {

     await deleteCart(id)
     dispatch(Action.updateDelete())
    }else{
      dispatch(Action.DeleteLocalStorage(id))
     dispatch(Action.updateDelete())

    }




  };

  console.log("cartList",cartdata)

  const fetch=async ()=>{
    if(isLogin)
      {

           const res= await  getCartItem()
           console.log("response",res);

             if( res?.length>0){
               
               dispatch(Action.setCartList(res))
              }else{
                dispatch(Action.setCartList([]))
              }
         
              }else{
                
          setdata("");
      }

  }

  React.useEffect(()=>{
       fetch();  
   },[updatedelete,updateAdd])

   

   const checkOut=()=>{
    navigate("/checkout")
   }

  return (
    <div className=" ">
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={modalValue}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-gray-400">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography   className=" relative"id="modal-modal-description" sx={{ mt: 2 }}>
            {cartdata.length === 0 ? (
              <p>No item in cart</p>
            ) : (
              <div>
                <div className="grid grid-cols-8 bg-black text-white p-1 mx-1 text-center ">
                  <p>product</p>
                  <p className="col-span-2 ">Title</p>
                  <p>price</p>
                  <p>quantity</p>
                  <p>total</p>
                  <p>delete</p>
                </div>
                <div className="p-1 ">
                  {cartdata?.length > 0 && cartdata?.map((val) => <Item onSelect={deleteItem} datas={val} />)}
                </div>
              </div>
            )}
           { cartdata?.length!==0 && <button onClick={checkOut} className="bg-black p-1 text-white absolute right-1 bottom-1 hover:bg-gray-200 hover:text-black  ">checkout</button>}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
