import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SelectedAds extends Component {

    render() {
        let selectedAdsID = '';

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
                selectedAdsID += (ad.adname + '&');
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

                <Link to={{ pathname:'/WtbReport/' + selectedAdsID }}>
                    <button>
                        Weight Top Box Report
                    </button>
                </Link>
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
