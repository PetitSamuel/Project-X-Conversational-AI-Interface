import React, { Component } from 'react';
import PunchCard from './components/PunchCard';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import '../../App.css';

const axios = require('axios').default; 

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentPunchData: null,
      entityPunchData: null,
      dataLoaded: false,
      changeV:true,
    };

    this.getData = this.getData.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  
  componentDidMount(){
    this.getData();
  }

  initAxes(){
    //Ew I know but they don't affect the graphs accuracy (count=0), just set the axis correctly
    var arr = [];
    arr.push({name: "Monday", value:23, count:0});
    arr.push({name: "Tuesday", value:1, count:0});
    arr.push({name: "Wednesday", value:0, count:0});
    arr.push({name: "Thursday", value:0, count:0});
    arr.push({name: "Friday", value:0, count:0});
    arr.push({name: "Saturday", value:0, count:0});
    arr.push({name: "Sunday", value:0, count:0});
    return arr;
  }

  changeView(e){
    e.preventDefault();
    if(this.state.changeV){
      this.setState({changeV: false});
    }
      this.setState({changeV: false});
    }
  

  getData(){
    var arr = this.initAxes();
    var temp = arr;
    axios.get('http://localhost:5000/api/intents-analytics')
     .then((response) => { 
       for(var i = 0; i < response.data.length; i++){
          arr.push(response.data[i]);
       }
       this.setState({intentPunchData:arr});
     })
     .catch(function (error) {
       console.log(error);
     });

     axios.get('http://localhost:5000/api/entities-analytics')
     .then((response) => { 
       for(var i = 0; i < response.data.length; i++){
          temp.push(response.data[i]);
       }
       this.setState({entityPunchData:temp});
     })
     .catch(function (error) {
       console.log(error);
     });
     setTimeout(function(){
      this.setState({dataLoaded:true});
      }.bind(this),2000);
  }

  //The form information is supposed to see by
  //run 'json-server db.json -w -p 8000' in /server directory
  //go 'http://localhost:8000/intents'
  render () {
    if(this.state.dataLoaded){
    return (
        <div className = "punch-tile">
          <ButtonGroup aria-label="Test">
            <Button name="intents" onClick = {this.changeView} variant="secondary">Intents</Button>
            <Button name="entities" onClick = {this.changeView} variant="secondary">Entities</Button>
          </ButtonGroup>
          <div style={{marginLeft:"10px"}}>
          {this.state.changeV?<PunchCard data = {this.state.intentPunchData}/>:
          <PunchCard data = {this.state.entityPunchData}/>}
          </div>
        </div>  
      )
    }
    else{
      return (
        <div style={{marginTop:"30%",marginLeft:"30%"}}>
          <h5>Loading...</h5>
        </div>
      )
    }
  }
}
export default Analytics;

