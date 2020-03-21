import React from 'react';
 

class UserAdd extends React.Component {
  
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
  handleSubmit(e){
    handleSubmit (e) {
  e.preventDefault();
 
  const {Intent,Description} = this.state;
  fetch('http://localhost:3000/', {
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

	}


  render() {
  	// 
  	const {Intent, Description} = this.state;
    return (
      <div>Intent add div>

		<main>
          <form>
            <label>Intent:</label>
            <input type="text" />
            <br />
            <label>Description:</label>
            <input type="text" />
            
            <br />
            <input type="submit" value="submit1" />
          </form>
        </main>



    );
  }
}
 
export default UserAdd;
