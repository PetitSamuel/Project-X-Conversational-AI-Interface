import React, { Component } from 'react';
import { select } from 'd3-selection';
import * as d3 from "d3";

class GeneratePunchCard extends Component {
    constructor() {
      super();
      this.ref = React.createRef();
    }
    componentDidMount() {
      const node = this.ref.current;
      const { xScale, yScale, data, lineGenerator } = this.props;
  
      const initialData = data.map(d => ({
        name: d.name,
        value: 0
      }));
      
      var z = d3.scaleLinear()
      .domain([1, 10])
      .range([ 10, 40]);
  
       select(node)
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return (xScale(d.name))+55 } )
        .attr("cy", function(d) { return yScale(d.value) } )
        .attr("r", function (d) { return z(d.count); } )
        .style("fill", "#f36")
        .style("opacity", "0.7")
        .attr("stroke", "black") 
    }
    
    
    render() {
      return <g className="line-group" ref={this.ref} />;
    }
  }
  
  export default GeneratePunchCard;