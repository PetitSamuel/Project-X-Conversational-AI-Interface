import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import '../../App.css';


//Intents
class Assistants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Intent: '',
      Description: ''
    };
  }

//Desperate times
  generateTable(){
    
    let x = ["RABBIT_CERTIFICATION", "RABBIT_PARENTS", "RABBIT_SOCIALISATION", "RABBIT_HEALTH", 
    "BREEDER_REFERENCES", "BREEDER_GUARANTEE", "BREEDER_INFORMATION", "RABBIT_FOOD", "RABBIT_HEALTH", 
    "PURCHASE_RABBIT", "departure", "arrival", "delay", "complaint", "these", "are", "just", "test","test",
    "test","test","test"];
    let arr = [];
    
    for(var i=0; i<x.length; i++) {
      var element = (
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="defaultUnchecked"></input>
          <label class="custom-control-label" for="defaultUnchecked">{x[i]}</label>
        </div>
      )
      arr.push(element);
    }
    return arr;
  }



  handleValueChange(field, value, type='string') {
    if(type === 'number'){
      value = + value;
    }
    this.setState({
      [field]: value
    });
  }
  handleSubmit (e) {
    e.preventDefault();
 
    const {Intent,Description} = this.state;
    fetch('http://localhost:8000/intents', {
      method: 'post',
      body: JSON.stringify({
        Intent,
          Description
      }),
        headers: {
       'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.id) {
        alert('add successfully');
        this.setState({
          Intent: '',
          Description: ''
        });
      } else {
        alert('fail to add');
      }
    })
    .catch((err) => console.error(err));
  }



  //The form information is supposed to see by
  //run 'json-server db.json -w -p 8000' in /server directory
  //go 'http://localhost:8000/intents'
  render () {


    var list = this.generateTable();
    return (

    <div>
      <InputGroup style = {{padding:"20px"}}>
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
      
      
      <Row style = {{padding:"20px"}}>
        <Col lg={5}>
          <Container fluid className="tile-glow">
            <h4> Intents: </h4>
            <div style ={{height:"70%", overflow:"auto", borderStyle: "solid", borderWeight:"0.1px", borderColor: "#13beb1", padding:"3px"}}>
              {list}
            </div>
            <button type="#" className="btn btn-primary">Remove</button>
          </Container>
        </Col>
      
        
        <Col lg={7}>
        
        <Jumbotron fluid style = {{width:"50%" ,padding:"20px"}}>
          <Form>
          <h4 style ={{paddingBottom: "6px"}}>Create New Intent</h4>

            <Form.Group controlId="Intent">
              <Form.Label>Intent</Form.Label>
              <Form.Control type="text" placeholder="Enter an intent" />
            </Form.Group>

            <Form.Group controlId="Intent.Description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Description" />
            </Form.Group>

            <button type="submit" className="btn btn-primary">Add</button>
          </Form>
        </Jumbotron>
        </Col>
      </Row>
    </div>


    )
  }
}
export default Assistants;

