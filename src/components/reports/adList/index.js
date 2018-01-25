import React, { Component } from 'react';
import Pagination from './pagination';
import { Link } from 'react-router-dom';

class AdList extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            adsPerPage: 20
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(pageNumber) {
        this.setState({
            currentPage: pageNumber
        });
    }


    render() {
        // Logic for displaying ads
        const indexOfLastAd = this.state.currentPage * this.state.adsPerPage;
        const indexOfFirstAd = indexOfLastAd - this.state.adsPerPage;
        const currentAds = this.props.ads.slice(indexOfFirstAd, indexOfLastAd);

        const tableHeader =
            <tr>
                <th scope="col">
                    Title
                </th>
                <th scope="col">
                    Brand
                </th>
                <th scope="col">
                    Date
                </th>
                <th scope="col">
                    Industry
                </th>
                <th scope="col">
                    Length
                </th>
                <th scope="col">
                    Channel
                </th>
                <th scope="col">
                    State
                </th>
                <th scope="col">

                </th>
            </tr>
        ;

        const renderedAds = currentAds.map((ad, i) => {
            return (
                <tr key={i}>
                    <td>
                        {ad.shortname}
                    </td>
                    <td>
                        {ad.brand}
                    </td>
                    <td>
                        {ad.campaigndate}
                    </td>
                    <td>
                        {ad.industry}
                    </td>
                    <td>
                        {ad.lengthAd}"
                    </td>
                    <td>
                        {ad.channel}
                    </td>
                    <td>
                        {ad.state}
                    </td>
                    <td>
                        <Link to={{ pathname:'/ad/' + ad.adname, query: { ad: ad } }}>
                            View
                        </Link>
                    </td>
                </tr>
            );
        });

        // The return from the AdList Class
        return (
            <div className="container-fluid">
                <h3>
                    Here is the list of Ads
                </h3>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        {tableHeader}
                    </thead>
                    <tbody>
                        {renderedAds}
                    </tbody>
                </table>
                <Pagination ads={this.props.ads} onClick={this.changePage} />
            </div>
        );
    }
}

export default AdList;
