import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import '../../App.css';

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
    fetch('http://localhost:3000/assistants', {
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


  render () {
    
    return (
    <div>
    <Row>

        <div className = "tile2">
        <h4 style ={{paddingBottom: "6px"}}>Add New Intent</h4>
            <form>
            <label>Intent:</label>
            <input type="text" />
            <br />
            <label>Description:</label>
            <input type="text" />
            
            <br />
            <input type="submit" value="submit" />
          </form>

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
