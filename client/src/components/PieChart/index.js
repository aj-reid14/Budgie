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
    subtitles: [{
      text: `Total - $${props.pieData.total}`,
      fontSize: 20
    }],
    animationEnabled: true,
    data: [{
      type: "pie",
      showInLegend: true,
      toolTipContent: "<b>{label}</b>: ${y}",
      legendText: "{label}",
      indexLabel: "{label} - ${y}",
      dataPoints: props.pieData.data
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
