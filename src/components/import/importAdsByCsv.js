import React, { Component } from 'react';
import { Api } from '../../constants';
import ReactFileReader from 'react-file-reader'; // move to single component later
import { HandleCSV } from '../functions';

const api = new Api();
const handleCSV = new HandleCSV();

class ImportAdsByCSV extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            imported: false
        }
    }

    static defaultProps = {
        api,
        handleCSV
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    // Returns the csv that the user uploads // move to a single component
    handleFiles = files => {
        const self = this;
        var reader = new FileReader();
        reader.onload = async function(e) {
            // Convert the CSV to object and send to API
            self.setStateAsync({
                imported: await self.props.api.createBulkAds(self.props.handleCSV.csvToObject(reader.result))
            })
        }
        reader.readAsText(files[0]);
    }


    render() {

        if (this.state.imported){
            return (
                <button className='btn' disabled>Upload successful</button>
            )
        } else {
            return (
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className='btn'>Upload Ads</button>
                </ReactFileReader>
            )
        }
    }
}

export default ImportAdsByCSV;
