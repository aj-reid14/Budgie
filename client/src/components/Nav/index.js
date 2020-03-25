import React from "react";

import "./style.css";
import img from "./birb.png";


// let greeting = window.location.pathname === "/" ? "" : "Hello,  " + sessionStorage.getItem("username");
let greeting = {
  text: "",
  logout: ""
}

function logout() {
  sessionStorage.removeItem("username");
  window.location.reload();
}

function Nav() {

  if (window.location.pathname === "/") {
      greeting.text = "";
      greeting.logout = "";
  } else {
    greeting.text = `Hello, ${sessionStorage.getItem("username")}`;
    greeting.logout = (<a className="nav-link" href="#" onClick={logout}>Logout</a>)
  }


  return (
    
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-success">
      <img src = {img} alt="budgie" height="42" width="42"></img>
      <a className="navbar-brand" href="/">
        Budgie
      </a>

      <div id = "greeting"> {greeting.text} </div>
      {greeting.logout}

      
      
    </nav>
  );
}

export default Nav;