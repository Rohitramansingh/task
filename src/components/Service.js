import React from "react";
import Project from "./Project";
import img1 from "./photo/s2.jpg";
import img2 from "./photo/s1.jpg";
import img3 from "./photo/s3.jpg";
import img4 from "./photo/s4.jpg";

function Service ()
{
    return (
        <div>
            <h2 className="text-center my-5">Our Service </h2>
        <div className="service my-5">
         <Project img={img1} text="service 1"/>
         <Project img={img2} text="service 2"/> 
         <Project img={img3} text="service 3"/>
         <Project img={img4} text="service  4"/>
        </div>

        </div>
    )
}
export default Service;