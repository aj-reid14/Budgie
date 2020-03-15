import React from 'react';
import CanvasJSReact from '../../canvasjs.react';
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
    <div>
    <CanvasJSChart options={options}
    /* onRef = {ref => this.chart = ref} */
    />
  </div>
  )
  }

  export default PieChart;
