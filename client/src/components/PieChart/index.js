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
      indexLabelPlacement: "inside",
      type: "pie",
      dataPoints: props.pieData
    }]}

  return (
    <div id="piechart-area">
    <CanvasJSChart options={options}
    /* onRef = {ref => this.chart = ref} */
    />
  </div>
  )
  }

  export default PieChart;
