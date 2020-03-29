import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Upload extends Component {
  /*
  handleUploadImage = e => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    
    var getDatas = axios.post('http://localhost:5000/upload', data)
     .then((response) => { 
       console.log(response.data);
       return response.data;
     })
     .catch(function (error) {
       console.log(error);
       return error;
     });
     console.log(getDatas);
  } 
  */
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    }

  }

  onChangeHandler = event => {
    if (event.target.files[0].type !== 'text/csv') {
      toast.error("Only CSV file formats are accepted!")
    } else {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      });
    }

  }
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:5000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        toast.success('upload success');
        console.log("trigger file download to : " + res.data.filename);
      })
      .catch(err => { // then print response status
        toast.error('upload fail');
        console.log(JSON.stringify(err));
      });
  }
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="offset-md-3 col-md-6">
            <div class="form-group files">
              <label>Upload Your File </label>
              <input type="file" class="form-control" multiple onChange={this.onChangeHandler} />
            </div>
            <div class="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>

            </div>

            <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

          </div>
        </div>
      </div>
    );
  }
}

export default Upload;