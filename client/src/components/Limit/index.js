import React from "react";
import { PromiseProvider } from "mongoose";


let Limit = (props) => {
  return (
    <div id="limitamount">
      <p>/{props.max}</p>
    </div>
    );
  };


export default Limit;