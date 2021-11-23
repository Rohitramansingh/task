import React from "react";

import  img1 from "./photo/bg1.jpg";
function Body()
{
    return(
        <div className="home">
         
          <img className="img" src={img1} alt="no img"></img> 
          <h1 className="head">Welcome to homepage</h1>
        </div>
    )
}
export default Body;