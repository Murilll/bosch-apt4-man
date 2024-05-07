import "./Style.css";
import { useState } from "react";
/* eslint-disable react/prop-types */
export const Card = (props) => {
  return (
    <div className="Ctn_background">
      <h1>{props.name}</h1>
      <div className="Ctn_Balls">
        <h2>{props.desc}</h2>
        <div className={props.status ? "lil_Ball" : "lil_Ball_On"}></div>
      </div>
      <p>{props.value}</p>
      <img src={props.image} alt={props.name} width={150} height={"auto"} />
    </div>
  )
}