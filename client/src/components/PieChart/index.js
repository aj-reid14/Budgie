import React, { Component } from 'react';
import CanvasJSReact from '../../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {

    state = {
        budgetName: this.props.budgetName,
        pieData: this.props.pieData
    }

  render() {
    const options = {
      title: {
        text: this.state.budgetName
      },
      data: [{		
        indexLabelPlacement: "inside",		
                type: "pie",
                dataPoints: this.state.pieData
                // dataPoints: [
                //     { label: "Food",  y: 2, indexLabel: `$100`  },
                //     { label: "Clothes", y: 15,  indexLabel: `$1000`},
                //     { label: "Rent", y: 25  , indexLabel: `$3000`},
                //     { label: "Gas",  y: 30 , indexLabel: `$6000` },
                //     { label: "Misc.",  y: 28 , indexLabel: `$5000` }
                // ]
       }]
   }
		
   return (
      <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }
}

export default PieChart;
