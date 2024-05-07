import "./Style.css";
import { useState } from "react";
/* eslint-disable react/prop-types */
export const CardAPI = ({name, status, species, type, gender, image}) => {
  
    const statusDict = {
        "Dead" : "lil_Ball",
        "Alive" : "lil_Ball_On",
        "unknown" : "lil_Ball_Unknow",
    }
  
    return (
    <div className="Ctn_background">
      <h1>{name}</h1>
      <div className="Ctn_Balls">
        <div className={statusDict[status]}></div>
      </div>
      <p>{species}</p>
      <p>{status}</p>
      <p>{type}</p>
      <p>{gender}</p>
      <img src={image} alt={name} width={150} height={"auto"} />
    </div>
  )
}