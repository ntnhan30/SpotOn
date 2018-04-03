import React, { Component } from 'react';
import {
    ImportAdsByCSV,
    ImportResultsByCSV
} from '../../components';

class Import extends Component {
    render() {
        return (
            <div className="import-main">
                <div>
                    <ImportAdsByCSV />
                </div>

                <div>
                    <ImportResultsByCSV />
                </div>
            </div>
        );
    }
}

export default Import;
