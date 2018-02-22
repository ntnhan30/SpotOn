import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class AdList extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            adsPerPage: 90
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(pageNumber) {
        this.setState({
            currentPage: pageNumber
        });
    }

    handleInputChange(ad, event) {
        this.props.handleSelection(ad, event.target.checked);
    }

    render() {
        // Logic for displaying ads
        const indexOfLastAd = this.state.currentPage * this.state.adsPerPage;
        const indexOfFirstAd = indexOfLastAd - this.state.adsPerPage;
        const currentAds = this.props.ads.slice( indexOfFirstAd, indexOfLastAd );

        const tableHeader =
            <tr>
                <th scope="col"></th>
                <th scope="col">Title</th>
                <th scope="col">Brand</th>
                <th scope="col">Date</th>
                <th scope="col">Industry</th>
                <th scope="col">Length</th>
                <th scope="col">Channel</th>
                <th scope="col">State</th>
                <th scope="col">Ad info</th>
            </tr>
        ;

        const renderedAds = currentAds.map((ad, i) => {
            if (ad.show){
                return (
                    <tr key={i}>
                        <td>
                            <Checkbox
                                name = { ad.adname }
                                checked = { ad.selected }
                                onChange = { e => this.handleInputChange(ad, e) }
                            />
                        </td>
                        <td>{ ad.shortname }</td>
                        <td>{ ad.brand }</td>
                        <td>{ ad.campaigndate }</td>
                        <td>{ ad.industry }</td>
                        <td>{ ad.lengthAd}"</td>
                        <td>{ ad.channel }</td>
                        <td>{ ad.state }</td>
                        <td>
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

        // The return from the AdList Class
        //<Pagination ads={this.props.ads} onClick={this.changePage} />
        return (
            <table className="table table-striped table-hover table-fixed">
                <thead className="">
                    {tableHeader}
                </thead>
                <tbody>
                    {renderedAds}
                </tbody>
            </table>
        );
    }
}

export default AdList;
