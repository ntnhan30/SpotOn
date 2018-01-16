import React, { Component } from 'react';

// move to single component later
import ReactFileReader from 'react-file-reader';


class Import extends Component {

    // Returns the csv that the user uploads // move to a single component
    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
        // Use reader.result
        console.log(reader.result)
        }
      reader.readAsText(files[0]);
    }


  render() {
    return (
        <div className="container-fluid">

            <h1>Import</h1>

            <h4>
                Here are the functionalities:
            </h4>
            <ul>
                <li><b>Import Ads by CSV</b></li>

                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>

                <li><b>Import Questionnaire Results by CSV</b></li>
                <li><b>Reimport, download, delete (Only admin)</b></li>
                <li>Import Ad by Form</li>
                <li>Import Questionnaire Results by Form</li>
                <li>Name generator tool</li>
                <li><i>Import Ads by CSV</i></li>
            </ul>
        </div>
    );
  }
}

export default Import;
