import React, { Component } from 'react';
import { Api } from '../../constants';
import ReactFileReader from 'react-file-reader'; // move to single component later
import { HandleCSV, TabulateAnswers } from '../functions';

const api = new Api();
const handleCSV = new HandleCSV();
const tabulateAnswers  = new TabulateAnswers ();

class ImportResultsByCSV extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            imported: false
        }
    }

    static defaultProps = {
        api,
        handleCSV,
        tabulateAnswers
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
            console.log(reader.result);
            let results = self.props.handleCSV.csvToObject(reader.result);

            console.log(results);
            // Convert the CSV to object and send to API
            self.setStateAsync({
                imported: await self.props.api.createBulkResults(results)
            })
            console.log(self.props.api);
            let KPIs = self.props.tabulateAnswers.init(results);
            console.log(KPIs);
            await self.props.api.createKPI(KPIs);
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
                    <button className='btn'>Upload Results</button>
                </ReactFileReader>
            )
        }
    }
}

export default ImportResultsByCSV;
