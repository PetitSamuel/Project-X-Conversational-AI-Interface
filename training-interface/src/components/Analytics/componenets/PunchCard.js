import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import AxisSettings from './Axis.js';
import GeneratePunchCard from './GeneratePunchCard.js';
import { extent } from 'd3-array';

class CreatePunchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
		data: null
    }
  }
  
  
  componentWillMount(){
	  this.setState({data: this.props.data});
  }


  render() {
	const { data } = this.state;
    const parentWidth = 800;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 400 - margins.top - margins.bottom;

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])


    return (
      <div>
        <svg width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}>

          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <AxisSettings {...{ xScale, yScale, height }} />
            <GeneratePunchCard data={data} xScale={xScale} yScale={yScale} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}
export default CreatePunchCard;
