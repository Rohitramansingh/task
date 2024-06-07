import React, { useEffect, useState } from "react"
import img1 from "./assert/phone/phone1.jpeg"
import img2 from "./assert/Laptop/lp1.jpeg"
import img3 from "./assert/Headphone/headphone1.jpeg"
import img4 from "./assert/Tv/tv1.jpeg"

export default function Slide ()
{
    const[count,setCount]=useState(0);
    const image=[img1 ,img2 ,img3 ,img4 ]

    useEffect(()=>{
            const interval=setInterval(() => {
                setCount((prevIndex) => (prevIndex + 1) % image.length);


                    return ()=>clearInterval(interval)
            }, 1000*5); 
    },[])

    console.log(count,"count")
    return(
        < div className="w-[100%] mx-auto  h-[300px] border border-green-500 mt-16 p-1 ">
            <img  className=" w-[90%] h-[100%] mx-auto transition-all duration-100 ease-in-out " src={image[count]} />
        </div> 
    )
}
