import React, { Component } from 'react';

class AdList extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            adsPerPage: 2
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
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
                    Industry
                </th>
                <th scope="col">
                    Length
                </th>
                <th scope="col">
                    Channel
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
                        {ad.industry}
                    </td>
                    <td>
                        {ad.lengthAd}
                    </td>
                    <td>
                        {ad.channel}
                    </td>
                </tr>
            );
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.ads.length / this.state.adsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                key={number}
                className="page-item"
                >
                    <span
                    className="page-link"
                    id={number}
                    onClick={this.handleClick}
                    >
                        {number}
                    </span>
                </li>
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
                <nav className="navigation" aria-label="Page navigation example">
                    <ul id="page-numbers" className="pagination">
                        {renderPageNumbers}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default AdList;
