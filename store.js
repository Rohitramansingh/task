import { configureStore, createSlice } from "@reduxjs/toolkit";
import arr from '../Data.json'
import { Alert } from "@mui/material";
import axios from "axios";


 const initialState=[]
let cartitem=[]

const   getData=async ()=>{
  initialState=await  axios("http://localhost:8000/product")
  console.log(arr.data,"axios");

 }
 const getCart =async()=>{
  cartitem=await  axios("http://localhost:8000/Cart")
 }
 getCart();

 getData();

console.log(initialState,"intial")

const itemSlice=createSlice({
    name: 'cart',
    initialState: {
      item: initialState,
      search:"",
      categogaryList:[],
      Modal:false,
      cartList:[],
      length : 0,
      login:[],
      isLogin:false,
      loginModal:false

    },
    reducers:{

   search(state,action)
   {
    const {data}=action.payload
    state.item=initialState
    const find=state.item.filter((item)=>item.name.toLowerCase().includes(data))
    state.item=find;


   },


   CheckBox(state,action){
   const {data}=action.payload
   
   state.item=initialState;
   if(data.length!==0)
    {

   const find=state.item.filter((item)=>data.includes(item.tag))
   console.log(find,"finddd");
   state.item=find;
    }

   


   },

   categogary(state,action){
    
       const {data}=action.payload;
      state.item=initialState
      const find=state.item.filter((items)=>items.categogary.toLowerCase().includes(data.toLowerCase()))
      state.item=find;


   },

   ActiveBtn(state,action){
      const {data} =action.payload;
      const find=state.categogaryList.findIndex((val)=>val===data)
      if(find===-1)
        {
            state.categogaryList.push(data);

        }else{
            const temp=state.categogaryList.filter((val)=>val!==data)
            state.categogaryList=temp;

        }
   },

   async AddCart(state, action) {
    const { id,count} = action.payload;
    console.log(id,"Addcart")
    const existingItemIndex = state.cartList.findIndex(items => items.id === id);
    
    if (existingItemIndex !== -1) {
      state.cartList[existingItemIndex].quantity += count
      
    } else {
      const existingItem = state.item.find(item => item.id === id);

    const obj={...existingItem,quantity:count}

      state.cartList.push(existingItem);
    state.length += 1

    

    }

    const existingItem = state.item.find(item => item.id === id);
   const res=await  setCart(existingItem) 

    

  },

  Increment(state, action) {
    const { id } = action.payload;
    const item = state.cartList.find(item => item.id === id);
    if (item) {
      item.quantity += 1;
      state.length += 1;
    }
  },

  Decrement(state, action) {
    const { id } = action.payload;
    const item = state.cartList.find(item => item.id === id);

    if (item) {
     

      item.quantity -= 1;
         

          if(item.quantity<=0)
            {
              // counterSlice.caseReducers.DeleteItem(state,{payload:{id:id}})
              const itemIndex=state.cartList.findIndex(val=>val.id===id);
              state.length -= state.cartList[itemIndex].quantity;
               state.cartList.splice(itemIndex, 1);


            }
        
    }
  },

  priceFilter(state,action){
    const {data}=action.payload;
    const min=parseInt(data.min);
    const max=parseInt(data.max);
    console.log(data,"minmax")
    state.item=initialState;
      if(data.min==="" && data.max==="")
        {
            state.item=initialState;
        }else{

            const filteredItems = state.item.filter((val) => {
                const price = parseInt(val.price);
                return price >= min && price <= max;
              });
            console.log(filteredItems ,"pricefilter")
        
            state.item=filteredItems;

        }


  },

  DeleteItem(state, action) {
    const {id} = action.payload;
    const itemIndex = state.cartList.findIndex(val => val.id === id);
        
    if (itemIndex !== -1) {
      state.length -= state.cartList[itemIndex].quantity;
      state.cartList.splice(itemIndex, 1);
    }
  },

   openModal(state)
   {
    state.Modal=true;
   },

   closeModal(state)
   {

    state.Modal=false;
   },

  login(state,action){
    state.isLogin=true;
  },

  logout(state)
  {
    state.isLogin=false;

  },

   singUp(state,action)
   {
     const {data}=action.payload;
     alert(data.email)
     state.login.push(data);
     console.log(data,"singup")
    
   },

   opentLoginModal(state)
   {
    state.loginModal=true;
  },
   closeLoginModal(state)
   {
    state.loginModal=false;
   
   }
}
}
)

const store=configureStore({
    reducer:itemSlice.reducer
})

export const Action =itemSlice.actions;
export default store;