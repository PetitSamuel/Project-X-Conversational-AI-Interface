import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import '../../App.css';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';


class Upload extends Component {

  render() {

    return (
      <div>
        <Row>

          <div className="tile2">
            <div>
              <h3 style={{ paddingBottom: "6px" }}>Upload CSV File</h3>
              <UploaderComponent asyncSettings={this.path} autoUpload={false} sequentialUpload={true}
                allowedExtensions='.csv' />>
          </div>
          </div>

        </Row>
      </div>
    )
  }
}
export default Upload;
