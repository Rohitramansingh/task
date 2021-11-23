import React from 'react'
function Project(props)
{
    return(
        <div className="project">
            <img className="size" src={props.img} alt=""></img>
            <p className="text-center">{props.text}</p>
        </div>

    )
}

export default Project;
