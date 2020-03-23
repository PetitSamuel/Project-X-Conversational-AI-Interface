import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import '../../App.css';
import { render } from 'react-dom';
import PieChart from 'react-simple-pie-chart';

class Analytics extends Component {
  
//I've tried every method I can get, but cannot reduce size
//This is the very basic version of pie chart
//You can find a better one here: https://apexcharts.com/react-chart-demos/pie-charts/simple-pie-chart/
//but I can't let it works
  render () {
    
    return (
      <div  >
      
        <PieChart 
          slices={[
          {

            color: '#3d5170',
            value: 10,
          },
          {
            color: '#13beb1',
            value: 20,
          },
          {
            color: '#e1e5ab',
            value: 38,
          },
          {
            color: '#11bae0',
            value: 32,
          },
        ]}
      />
      </div>
    );
  }
}
export default Analytics;
