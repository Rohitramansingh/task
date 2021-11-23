import React, { useState } from "react";
function Contact ()
{
    const [data,fulldata]=new useState({
        name:"",
        email:"",
        addressed:"",
        number:""
    })

    const event=(e)=>{

       const {name,value}=e.target;
       fulldata((prev)=>{
           return{
               ...prev,
               [name]:value,
           }
       })
     


    }

    const submit=()=>{
       alert("form submitted Succesfully");
       
            
        
    }
    return(
        <div>
            <h2 className="text-center my-5"> Contact us</h2>
        <div className="input_style my-5">
           <input type="text"
           placeholder="Enter Name"
           className="input"
           name="name"
           value={data.name}
           onChange={event}
            >
           </input> 

           <input type="text"
           placeholder="Enter Addressed"
           className="input"
           name="addressed"
           value={data.addressed}
           onChange={event}
            >
           </input> <input type="Email"
           placeholder="Enter Email"
           className="input"
           name="email"
           value={data.email}
           onChange={event}
            >
           </input> <input type="Number"
           placeholder="Enter Number"
           className="input"
           name="number"
           value={data.number}
           onChange={event}
            >
           </input>

           <button className="input btn" onClick={submit}>Submit</button>

         
        </div>

        </div>
    )
    
}

export default Contact;
   
       
    

