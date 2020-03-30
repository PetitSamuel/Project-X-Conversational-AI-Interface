import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import IntentForm from './components/IntentForm'
import '../../App.css';

const axios = require('axios').default; 

class Intents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intent: '',
      string: '',
      obj:null,
      arrString: null,
      addExpressions:[],
    };

    this.generateTable = this.generateTable.bind(this);
  }
  
  componentDidMount(){
    this.generateTable();
  }

  getData(){
     var getDatas = axios.get('http://localhost:5000/api/intents')
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
  
  generateTable(){
    this.getData()
      .then((response) => { 
        console.log("response", response);
        var x = response;
        var arr = [];
        
        for (var i=0; i<x.length; i++) {
          var element = (
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id={x[i]._id}></input>
              <label className="custom-control-label" for={x[i]._id}> {x[i].name} </label>
            </div>
          )
          arr.push(element);
        }
        this.setState({arrString: arr}) 
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  
  //The form information is supposed to see by
  //run 'json-server db.json -w -p 8000' in /server directory
  //go 'http://localhost:8000/intents'
  render () {
    return (
    <div>
      <InputGroup style = {{padding:"20px"}}>
        <InputGroup.Prepend>
          <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
        </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Search for an intent"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
      </InputGroup>

      <Row style = {{padding:"20px"}}>
        <Col lg={5}>
          <Container fluid className="tile-glow">
            <h4> Intents: </h4>
            <div style ={{height:"70%", overflow:"auto", borderStyle: "solid", borderWeight:"0.1px", borderColor: "#13beb1", padding:"3px"}}>
              {this.state.arrString}
            </div>
            <button type="#" className="btn btn-primary">Remove</button>
          </Container>
        </Col>

        <Col lg={7}>
          <Jumbotron fluid style = {{width:"50%" ,padding:"20px"}}>
           <IntentForm/>
          </Jumbotron>
        </Col>
      </Row>
    </div>
    )
  }
}
export default Intents;

