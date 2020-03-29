import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FileDownload = require('js-file-download');

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      downloadUrl: null,
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
    axios.post("http://localhost:5000/api//upload-csv", data)
      .then(res => {
        toast.success('Success: file uploaded and converted to md!');
        console.log("trigger file download to : " + res.data.filename);
        this.setState({
          downloadUrl: 'http://localhost:5000/api/download-md/' + res.data.filename,
        });
      })
      .catch(err => {
        toast.error('Error: file upload failed.');
        console.log(JSON.stringify(err));
      });
  }

  onDownload = () => {
    axios.get(this.state.downloadUrl)
      .then((response) => {
        FileDownload(response.data, 'converted-from-csv.md');
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
            <button type="button" class="btn btn-success btn-block" disabled={!this.state.downloadUrl} onClick={this.onDownload}>download</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;