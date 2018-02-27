import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class SelectedAds extends Component {

    render() {
        let selectedAdsID = [];

        const tableHeader =
            <tr>
                <th scope="col">
                    SELECTED ADS
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
                            <span>
                                {ad.brand}, {ad.industry}, {ad.channel} {ad.lengthAd}'
                            </span>
                        </td>
                        <td className="selected-icons">
                            <span className="icon-close" onClick={() => this.props.handleSelection(ad, false)}></span>
                            <Link to={{ pathname:'/ad/' + ad.adname, query: { ad: ad } }}>
                                <span className="icon-more"></span>
                            </Link>
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
                    <tr className="selectedButtons">
                        <td colSpan="2">
                            <div>
                                <Link to={{ pathname:'/weightedReport/' + selectedAdsID.join('&') }}>
                                    <button>
                                        Weighted
                                    </button>
                                </Link>
                                <Link to={{ pathname:'/percentileReport/' + selectedAdsID.join('&') }}>
                                    <button>
                                        Percentile
                                    </button>
                                </Link>
                                <Link to={{ pathname:'/chart/' + selectedAdsID.join('&') }}>
                                    <button>
                                        Chart
                                    </button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                )
            } else {
                return ( <Fragment></Fragment> );
            }
        };

        const listSelectedAds = () => {
            if (selectedAdsID.length > 0) {
                return (
                    <Fragment>
                        {renderedAds}
                    </Fragment>
                )
            } else {
                return (
                    <tr>
                        <td colSpan="2">
                            CLICK ON THE CHECKBOX TO ADD TO THE SELECTION
                        </td>
                    </tr>
                );
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
                        { reportButtons() }
                        { listSelectedAds () }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SelectedAds;
