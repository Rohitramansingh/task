import react, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../Store/store";
import Slide from "./Slide";
export default function Main() {
    const items = useSelector((state) => state.item);
    const dispatch=useDispatch();


    const [filteredItems, setFilteredItems] = useState(items);
    const [checkeds, setChecked] = useState([]);
    const [price, setPrice] = useState({
      min:0,
      max:0
    });

  const labelarr=[
    {id:1,name:"Laptop"},
    {id:2,name:"Tv"},
    {id:1,name:"Phone"},
    {id:1,name:"Headphne"}
    ]
  const catlist=useSelector(state=>state.categogaryList)
  console.log(catlist,'catlist');

  useEffect(()=>{
    
      setFilteredItems(items);
     
  },[items])

  let nonActive="text-sm  border border-black bg-white p-1 px-2   my-2   rounded-lg  "
  let Active="text-sm  border border-black bg-black  text-white  p-1 px-2   my-2   rounded-lg  "
  
  function Handler(data){
    dispatch(Action.ActiveBtn({data:data}))
    dispatch(Action.categogary({data:data}))
  }

  function checkChange(e)
  {
    const {value,checked}=e.target;
    if(checked)
      {
        setChecked((prev)=>[...prev,value.toLowerCase()])
        dispatch(Action.CheckBox({data:[...checkeds,value.toLowerCase()]}))

      }else{
        setChecked((prev)=>prev.filter((val)=>val!==value.toLowerCase()))
      dispatch(Action.CheckBox({data:checkeds.filter((val)=>val!==value.toLowerCase())}))

        
      }

  }

  const priceHandler=(e)=>{

    const {value,name}=e.target;
    setPrice((prev)=>{return  {...prev,[name]:value}})
   
    dispatch(Action.priceFilter({data:{...price,[name]:value}}))


  }

 
 
  console.log(checkeds,"checked")
 

  return (
    <div className="text-center mt-20 shadow-lg border  m-6 ">
      <Slide/>
     
     
      <main className="grid grid-cols-5 gap-4  ">
        {/* filter  */}
        <filter className="h-[100%] bg-gray-200  ">
        <h2 className="font-bold mx-2 p-1 text-start mt-5 ">filter</h2>

        <h2 className="font-bold mx-2 p-1 text-start mt-5 ">Categogary</h2>
        <div  className="grid grid-cols-3 justify-around p-2 gap-1  ">
        <p onClick={()=>Handler("sport")}      className={  `${catlist.findIndex((v)=>v==="sport")  !==-1 ? Active : nonActive }`}>sport</p>
        <p  onClick={()=>Handler("grocery")}   className={  `${catlist.findIndex((v)=>v==="grocery")  !==-1 ? Active : nonActive }`}>Grocerry</p>
        <p  onClick={()=>Handler("makeup")}    className={  `${catlist.findIndex((v)=>v==="makeup")  !==-1 ? Active : nonActive }`} > Makeup </p>
      <p  onClick={()=>Handler("Accessories")} className={  `${catlist.findIndex((v)=>v==="Accessories")  !==-1 ? Active : nonActive }`}>Accessories </p>
       <p  onClick={()=>Handler("Electronic")} className={  `${catlist.findIndex((v)=>v==="Electronic")  !==-1 ? Active : nonActive }`}>Electronic  </p>
        </div>

        {/* price range */}

        <h2 className="font-bold mx-2 p-1 text-start mt-5 ">Price Range</h2>
        <div className="flex p-2 space-x-4 ">
        <input onChange={priceHandler}  name="min" className="w-[45%] p-1 " type="number" placeholder="Min" />
        <input onChange={priceHandler} name="max" className="w-[45%] p-1 " type="number" placeholder="max" />
        </div>

        {/* <ITEMS></ITEMS> */}

        <h2 className="font-bold mx-2 p-1 text-start mt-5 ">Categogary</h2>
        < div>
        {labelarr.map((val)=>{
            return(
                <div className="flex space-x-1 p-2 ">
                <input type="checkbox"  value={val.name} onChange={checkChange}  id={val.id}/>
                <p>{val.name}</p>
            </div>

            )
        })}
       

        

        
        </div>



             
        </filter>

        {/* contenet div  */}
        <div className=" col-span-4 p-2 mx-2  grid grid-cols-4 gap-2 ">
          { filteredItems &&
            filteredItems.map((val) => {
              return <Card data={val} />;
            })}
        </div>
      </main>
    </div>
  );
}
