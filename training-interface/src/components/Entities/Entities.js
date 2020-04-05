import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import '../../App.css';

const axios = require('axios').default;

class Entities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Entity: '',
      Value: '',
      Synonyms: '',
      tableArray: null,
    };
  }

  componentDidMount() {
    this.generateTable();
  }


  getData() {
    var getDatas = axios.get('http://localhost:5000/api/entities')
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;

      });
    return getDatas;
  }

  // Similar to intents, if I was to work more on this there would be a table component to prevent dupe
  generateTable() {
    this.getData()
      .then((response) => {
        console.log("response", response);
        var x = response;
        var arr = [];

        for (var i = 0; i < x.length; i++) {
          var element = (
            <div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={x[i]._id} onClick={this.handleCheck} name={x[i].name}></input>
                <label className="custom-control-label" for={x[i]._id}> {x[i].name} </label>
              </div>
            </div>
          )
          arr.push(element);
        }
        this.setState({ tableArray: arr })
      })

      .catch(function (error) {
        console.log(error);
      });
  }



  //The form information is supposed to see by
  //run 'json-server db.json -w -p 8000' in /server directory
  //go 'http://localhost:8000/entities'
  render() {

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
                {this.state.tableArray}
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
