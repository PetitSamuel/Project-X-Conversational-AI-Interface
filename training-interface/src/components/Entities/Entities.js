import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import '../../App.css';

class Entities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Entity: '',
      Value: '',
      Synonyms: ''
    };
  }

  generateTable() {
    let arr = [];

    for (var i = 0; i < x.length; i++) {
      var element = (
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id={x[i]}></input>
          <label class="custom-control-label" for={x[i]}>{x[i]}</label>
        </div>
      )
      arr.push(element);
    }
    return arr;
  }



  //The form information is supposed to see by
  //run 'json-server db.json -w -p 8000' in /server directory
  //go 'http://localhost:8000/entities'
  render() {
    //var list = this.generateTable();

    return (
      <div>
        <InputGroup style={{ padding: "20px" }}>
          <InputGroup.Prepend>
            <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Search for an entity"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
        </InputGroup>


        <Row style={{ padding: "20px" }}>
          <Col lg={5}>
            <Container fluid className="tile-glow">
              <h4> Entities: </h4>
              <div style={{ height: "70%", overflow: "auto", borderStyle: "solid", borderWeight: "0.1px", borderColor: "#13beb1", padding: "3px" }}>
                {list}
              </div>
              <button type="#" className="btn btn-primary">Remove</button>
            </Container>
          </Col>

          <Col lg={7}>
            {/* Ruxin I have just converted your form to React Bootstrap (makes styling easier)
          https://react-bootstrap.netlify.com/components/forms/#forms */}
            <Jumbotron fluid style={{ width: "50%", padding: "20px" }}>
              {/*Form*/}
            </Jumbotron>
          </Col>
        </Row>
      </div>

    )
  }
}
export default Entities;
