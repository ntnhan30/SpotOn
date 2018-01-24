import React, { Component } from 'react';
import { Api } from '../../../constants/api';
import ReactFileReader from 'react-file-reader'; // move to single component later

const api = new Api();

class ImportAdsByCSV extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'N/A',
        }
    }

    static defaultProps = {
        api
    }

    csvToArray = csvString => {
        // The array we're going to build
        let csvArray   = [];
        // Break it into rows to start
        let csvRows    = csvString.split(/\n/);
        // Take off the first line to get the headers, then split that into an array
        let csvHeaders = csvRows.shift().concat(',i').replace('\r','').split(',');

        // Loop through remaining rows
        for(let rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
            let rowArray  = csvRows[rowIndex].split(',');

          // Create a new row object to store our data.
          let rowObject = csvArray[rowIndex] = {};

          // Then iterate through the remaining properties and use the headers as keys
          for(let propIndex = 0; propIndex < rowArray.length; ++propIndex){
            // Grab the value from the row array we're looping through...
            //var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
            let propValue =   rowArray[propIndex].replace('\r','');
            // ...also grab the relevant header (the RegExp in both of these removes quotes)
            //var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');
            let propLabel = csvHeaders[propIndex];

            rowObject[propLabel] = propValue;
          }
        }
        return csvArray;
    }

    // Returns the csv that the user uploads // move to a single component
    handleFiles = files => {
        const self = this;
        var reader = new FileReader();
        reader.onload = function(e) {
            // Convert the CSV to object and send to API
            self.props.api.createBulkAds(self.csvToArray(reader.result));
        }
        reader.readAsText(files[0]);
    }

    render() {

        return (
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <button className='btn'>Upload</button>
            </ReactFileReader>
        )
    }

}

export default ImportAdsByCSV;
