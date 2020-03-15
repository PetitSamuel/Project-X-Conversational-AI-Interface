import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import '../../../App.css';
export class StatsCard extends Component {

  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div className="icon-big text-center">
                {this.props.bigIcon}
              </div>
            </Col>
            <Col xs={7}>
              <div className="numbers">
                <p>{this.props.statTitle}</p>
                {this.props.statValue}
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            <div className="stats">
              {this.props.statIcon} {this.props.statIconText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;