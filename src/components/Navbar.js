import React from"react";
import { Link } from "react-router-dom";
function Navbar()
{
    return (
        

        <div className="navbar">
         <ul className="ul">
             <Link to="/">Home</Link>
             <Link to="/service">service</Link> 
             <Link to="/About">About us</Link>
              <Link to= "/contact">Contact us</Link>
         </ul>
        </div>

        
    )
}
export default Navbar;