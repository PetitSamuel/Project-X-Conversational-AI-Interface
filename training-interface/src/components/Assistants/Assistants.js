import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
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
    
    return (
    <div>
    <Row>

            <form class="tile4">
              <h4 style ={{paddingBottom: "6px"}}>Add New Intent</h4>
              <label>
              <span>Intent :</span>
              <input id="Intent" type="text" name="Intent" />
              </label>

              <label>
              <span>Description :</span>
              <textarea id="Description" name="Description"></textarea>
              </label>
              
              <label>
              <span>&nbsp;</span>
              <input type="submit" class="button" value="submit" />
              </label>
            </form>

            <div className = "tile2">
            </div>
    </Row>

    <Row>

      <div className = "tile3">
          <h3 style ={{paddingBottom: "6px"},{paddingLeft: "10px"}}>Intents</h3>
          
      </div>
   
    </Row> 
    </div>
    )
  }
}
export default Assistants;

