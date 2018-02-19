import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SelectedAds extends Component {

    render() {
        let selectedAdsID = [];

        const tableHeader =
            <tr>
                <th scope="col">
                    Selected Ads
                </th>
                <th scope="col">
                </th>
            </tr>
        ;

        const renderedAds = this.props.ads.map((ad, i) => {
            if (ad.selected){
                console.log(ad);
                selectedAdsID.push(ad.adname);
                return (
                    <tr key={i}>
                        <td>
                            {ad.shortname}
                            <span>
                                {ad.brand}, {ad.industry}, {ad.channel} {ad.lengthAd}'
                            </span>
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
                    <div className="selectedButtons">
                        <Link to={{ pathname:'/wtbReport/' + selectedAdsID.join('&') }}>
                            <button>
                                Weighted
                            </button>
                        </Link>
                        <Link to={{ pathname:'/chart/' + selectedAdsID.join('&') }}>
                            <button>
                                Chart
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
