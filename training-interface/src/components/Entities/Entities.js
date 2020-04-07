import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import EntityForm from './components/EntityForm'
import '../../App.css';

const axios = require('axios').default;

class Entities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableArray: null,
      removeList: [],
    };
    this.generateTable = this.generateTable.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.generateTable();
  }


  getData() {
    var getDatas = axios.get('http://localhost:5000/api/entities')
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;

      });
    return getDatas;
  }

  handleCheck(e) {
    var inList = false;
    var arr = this.state.removeList;
    for (var i = 0; i < arr.length; i++) {
      //Remove if unchecked
      if (arr[i] === e.target.name) {
        inList = true;
        arr.splice(i, 1)
        console.log('Removed', e.target.name)
      }
    }
    if (!inList) {
      arr.push(e.target.name);
      console.log('Added', e.target.name);
    }
    this.setState({ removeList: arr })
    console.log('Updated', arr)
  }

  handleRemove(e) {
    e.preventDefault();
    var promiseArr = [];
    var arr = this.state.removeList;
    console.log('Trying to remove:', arr);

    arr.forEach(e => {
      var req = 'http://localhost:5000/api/entities/' + e.toString();
      console.log('removing', req);
      promiseArr.push(axios.delete(req))
    })
    Promise.all(promiseArr)
      .then(function (response) {
        console.log(response);
        //window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // Similar to intents, if I was to work more on this there would be a table component to prevent dupe
  generateTable() {
    this.getData()
      .then((response) => {
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
              <Button onClick={this.handleRemove} variant="outline-danger" style={{ float: "right", width: "20%", margin: "30px" }}>Remove</Button>
            </Container>
          </Col>

          <Col lg={7}>
            {/* Ruxin I have just converted your form to React Bootstrap (makes styling easier)
          https://react-bootstrap.netlify.com/components/forms/#forms */}
            <Jumbotron fluid style={{ width: "50%", padding: "20px" }}>
              <EntityForm edit={this.state.edit} editState={this.state.edit} />
            </Jumbotron>
          </Col>
        </Row>
      </div>

    )
  }
}
export default Entities;
