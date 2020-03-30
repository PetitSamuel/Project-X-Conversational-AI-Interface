import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
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
      
      <div style = {{padding:"40px"}}>
      <Container fluid className="tile-glow" style={{width:"50%" ,padding:"30px"}}>
      <Col lg={{ span: 10, offset: 2 }} >
      
      <div class="container" style ={{height:"70%", padding:"3px"}}>
        <div class="row">
          <div class="offset-md-0 col-md-10">

            <div class="form-group files">
              <h4><label>Upload Your File </label></h4>
              <input type="file" class="form-control-upload" multiple onChange={this.onChangeHandler} />
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
      
      </Col>
      </Container>
      </div>
    );
  }
}

export default Upload;