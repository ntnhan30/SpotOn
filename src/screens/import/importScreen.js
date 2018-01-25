import React, { Component } from 'react';
import { ImportAdsByCSV, ImportResultsByCSV } from '../../components';

class Import extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Import</h1>

                <h4>Here are the functionalities:</h4>

                <ul>
                    <li><b>Import Ads by CSV</b></li>
                    <ImportAdsByCSV />
                    <li><b>Import Questionnaire Results by CSV</b></li>
                    <ImportResultsByCSV />
                    <li><b>Reimport, download, delete (Only admin)</b></li>
                    <li>Import Ad by Form</li>
                    <li>Import Questionnaire Results by Form</li>
                    <li>Name generator tool</li>
                </ul>
            </div>
        );
    }
}

export default Import;
