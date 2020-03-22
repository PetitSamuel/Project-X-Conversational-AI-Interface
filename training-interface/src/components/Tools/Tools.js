import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import '../../App.css';

//Entities
class Tools extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Entity: '',
      Value: '',
      Synonyms: ''
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
 
    const {Entity,Value,Synonyms} = this.state;
    fetch('http://localhost:8000/entities', {
      method: 'post',
      body: JSON.stringify({
        Entity,
        Value,
        Synonyms
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
          Entity: '',
          Value: '',
          Synonyms: ''
        });
      } else {
        alert('fail to add');
      }
    })
    .catch((err) => console.error(err));
  }

  //The form information is supposed to see by
  //run 'json-server db.json -w -p 8000' in /server directory
  //go 'http://localhost:8000/entities'
  render () {
    
    return (
    <div>
    <Row>

            <form class="tile4">
              <h4 style ={{paddingBottom: "6px"}}>Add New Entity</h4>
              <label>
              <span>Entity :</span>
              <input id="Entity" type="text" name="Entity" />
              </label>

              <label>
              <span>Value :</span>
              <input id="Value" type="text" name="Value" />
              </label>

              <label>
              <span>Synonyms :</span>
              <input id="Synonyms" type="text" name="Synonyms" />
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
          <h3 style ={{paddingBottom: "6px"},{paddingLeft: "10px"}}>Entities</h3>
          
      </div>
   
    </Row> 
      </div>
    )
  }
}
export default Tools;
