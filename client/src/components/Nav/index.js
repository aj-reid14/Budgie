import React from "react";
import "./style.css";
import img from "./birb.png";

function Nav() {
  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-success">
      <a className="navbar-brand" href="/">
        Budgie
      </a>

      <img src = {img} alt="budgie" height="42" width="42"></img>
      
    </nav>
  );
}

export default Nav;