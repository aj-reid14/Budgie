import React from 'react';
import CanvasJSReact from '../../canvasjs.react';
import "./style.css"
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart(props) {

  const options = {
    title: {
      text: props.budgetName
    },
    data: [{
      type: "pie",
      dataPoints: props.pieData
    }]
  }

  return (
    <div id="piechart-area">
      <CanvasJSChart options={options} />

      <button
        id="btn-delete-budget"
        type="button"
        onClick={props.deleteBudget}
        className="btn btn-danger">
        Delete Budget</button>
        
    </div>
  )
}

export default PieChart;
