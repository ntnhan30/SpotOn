import React, { Component } from 'react';

class SelectedAds extends Component {

    render() {

        const tableHeader =
            <tr>
                <th scope="col">
                    Title
                </th>
                <th scope="col">

                </th>
            </tr>
        ;

        const renderedAds = this.props.ads.map((ad, i) => {
            if (ad.selected){
                return (
                    <tr key={i}>
                        <td>
                            {ad.shortname}
                        </td>
                        <td>
                            <button onClick={() => this.props.removeFromSelected(ad, false)}>X</button>
                        </td>
                    </tr>
                );
            } else {
                return false;
            }
        });



        // Display the sidebar
        return (
            <div>
                <h3>
                    Selected Ads
                </h3>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        {tableHeader}
                    </thead>
                    <tbody>
                        {renderedAds}
                    </tbody>
                </table>

                <button>
                    Weight Top Box Report
                </button>
                <br/>
                <button>
                    Percentile Report
                </button>
                <br/>
                <button>
                    Charts
                </button>
            </div>
        );
    }
}

export default SelectedAds;
