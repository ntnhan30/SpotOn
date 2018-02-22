import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MoreIcon from'../../Assets/imgs/more.svg';
import CloseIcon from'../../Assets/imgs/close.svg';

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
                        <td>
                            CLICK ON THE CHECKBOX TO ADD TO THE SELECTION
                        </td>
                        <td></td>
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
                        { listSelectedAds () }
                    </tbody>
                </table>

                { reportButtons() }
            </div>
        );
    }
}

export default SelectedAds;
