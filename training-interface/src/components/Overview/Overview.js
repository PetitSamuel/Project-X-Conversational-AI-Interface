import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatsCard from './components'
import '../../App.css';

import { TiTick } from "react-icons/ti";
import { GiTalk } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import { MdSmsFailed } from "react-icons/md";


class Overview extends Component {
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
                bigIcon={<TiTick />}
                statTitle="Rasa Status"
                statValue={this.state.status ? 'Up' : 'Down'}
                statIcon={<TiTick />}
                statIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<GiTalk />}
                statTitle="Active Sessions"
                statValue={this.state.activeSessions}
                statIcon={<TiTick />}
                statIconText="Updated Now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<FaTasks/>}
                statTitle="Chats Served"
                statValue={this.state.chatsServed}
                statIcon={<TiTick />}
                statIconText="Updated Now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<MdSmsFailed />}
                statTitle="Failures"
                statValue={this.state.failures}
                statIcon={<TiTick />}
                statIconText="In the last day"
              />
            </Col>
          </Row>
 
      </div>
    )
  }
}
export default Overview;
