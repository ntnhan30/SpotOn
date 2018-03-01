import React, { Component, Fragment } from 'react';
import { ImportAdsByCSV, ImportResultsByCSV } from '../../components';

class Import extends Component {
    render() {
        return (
            <Fragment>

                <div className="import-main">
                        <div>
                            <ImportAdsByCSV />
                        </div>

                        <div>
                            <ImportResultsByCSV />
                        </div>
                </div>
            </Fragment>
        );
    }
}

export default Import;
