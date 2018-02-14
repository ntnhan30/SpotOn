import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SelectedAds extends Component {

    render() {
        let selectedAdsID = [];

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
                selectedAdsID.push(ad.adname);
                return (
                    <tr key={i}>
                        <td>
                            {ad.shortname}
                        </td>
                        <td>
                            <button onClick={() => this.props.handleSelection(ad, false)}>X</button>
                        </td>
                    </tr>
                );
            } else {
                return false;
            }
        });

        const reportButtons = () => {
            if (selectedAdsID.length > 0) {
                return (
                    <div>
                        <Link to={{ pathname:'/wtbReport/' + selectedAdsID.join('&') }}>
                            <button>
                                Weight Top Box Report
                            </button>
                        </Link>
                        <br/>
                        <Link to={{ pathname:'/chart/' + selectedAdsID.join('&') }}>
                            <button>
                                Charts
                            </button>
                        </Link>
                    </div>
                )
            } else {
                return ( <div></div> );
            }
        };

        // Display the sidebar
        return (
            <div>
                <h3>
                    Selected Ads
                </h3>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        { tableHeader }
                    </thead>
                    <tbody>
                        { renderedAds }
                    </tbody>
                </table>

                { reportButtons() }
            </div>
        );
    }
}

export default SelectedAds;
