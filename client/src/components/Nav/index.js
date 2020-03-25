import React from "react";

import "./style.css";
import img from "./birb.png";


let greeting = window.location.pathname === "/" ? "" : "Hello,  " + sessionStorage.getItem("username");



function Nav() {
  return (

    
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-success">
      <img src = {img} alt="budgie" height="42" width="42"></img>
      <a className="navbar-brand" href="/">
        Budgie
      </a>

      

      
      <div id = "greeting"> {greeting} </div>

      
      
    </nav>
  );
}

export default Nav;