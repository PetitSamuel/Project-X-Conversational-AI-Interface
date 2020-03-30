import React, { Component } from 'react';
import '../../App.css';

const axios = require('axios').default; 

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentPunchData: '',
      entityPunchData: '',
    };

    this.getData = this.getData.bind(this);
  }
  
  componentDidMount(){
    this.getData();
  }

  getData(){
     axios.get('http://localhost:5000/api/intents-analytics')
      .then((response) => { 
        this.setState({intentPunchData: response});
        console.log(this.state.intentPunchData);
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
    <div></div>
    )
  }
}
export default Analytics;

