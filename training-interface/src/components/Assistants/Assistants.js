import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatsCard from './components'
import '../../App.css';

import { TiTick } from "react-icons/ti";
import { GiRobotAntennas } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";
import { MdSmsFailed } from "react-icons/md";


class Assistant extends Component {
  constructor (props) {
    super(props);
    this.state = {
      status: true,
      activeSessions:0,
      chatsServed:0,
      failures:0,
      
    };
  }
  render () {
    
    return (
    <div>
          <Row style = {{paddingTop:"20px"}}>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<FaRobot />}
                statTitle="OpenJawTest1"
                statValue={this.state.status ? 'Up' : 'Down'}
                statIcon={<TiTick />}
                statIconText="Current"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<GiRobotAntennas />}
                statTitle="CustomerSupport"
                statValue={this.state.activeSessions}
                statIcon={""}
                statIconText="Last updated, 2 days ago"
              />
            </Col>
            <Col lg={3} sm={6}>
              
              />
            </Col>
            <Col lg={3} sm={6}>
           
            </Col>
          </Row>
 
      </div>
    )
  }
}
export default Assistant;
