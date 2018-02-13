import React, { Component } from 'react';
import { Api } from '../../constants';

const api = new Api();

class SingleAd extends Component {
    constructor() {
        super();
        this.state = {
            thisAd: [], // this is the list of filtered ads
            thisResults: [],
            adStillExist: true
        };
    }

    static defaultProps = {
        api
    }

    componentDidMount = async () => {
        // Get the adname of this Ad
        const adname = this.props.match.params.id;

        // Retrieve the ad details from the server
        const thisAd = await this.props.api.fetchSingleAd(adname);
        console.log(thisAd);

        // Save them into the state
        this.setState({
            thisAd: thisAd.ad,
            thisResults: thisAd.results,
        });
    }

    deleteSingleAd = async () => {
        // Retrieve the ad details from the server
        const didItDelete = await this.props.api.deleteAd(this.state.thisAd.adname);

        this.setState({
            adStillExist: !didItDelete,
        });
    }

    reimportAd = () => {
        console.log(this.props.api);
    }

    downloadAd = () => {
        console.log(this.props.api);
    }

    render() {
        if(this.props.match !== undefined && this.props.match.params !== undefined && this.state.adStillExist){
            return (
                <div className="container-fluid">
                    <div className="col-md-8 offset-md-2">
                        <h1>
                            {this.state.thisAd.adname}
                        </h1>
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Industry</th>
                                    <th>Date</th>
                                    <th>Country</th>
                                    <th>Length</th>
                                    <th>Production State</th>
                                    <th>State</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.thisAd.shortname}</td>
                                    <td>{this.state.thisAd.brand}</td>
                                    <td>{this.state.thisAd.industry}</td>
                                    <td>{this.state.thisAd.campaigndate}</td>
                                    <td>{this.state.thisAd.country}</td>
                                    <td>{this.state.thisAd.lengthAd}"</td>
                                    <td>{this.state.thisAd.productionState}</td>
                                    <td>{this.state.thisAd.state}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button
                            className="btn btn-default"
                            onClick={this.downloadAd}>
                            DOWNLOAD
                        </button>
                        <button
                            className="btn btn-default"
                            onClick={this.reimportAd}>
                            REIMPORT
                        </button>
                        <button
                            className="btn btn-default"
                            onClick={this.deleteSingleAd}>
                            DELETE
                        </button>
                    </div>
                </div>
            );
        } else if (!this.state.adStillExist) {
            return (
                <div className="container-fluid">
                    <div className="col-md-8 offset-md-2">
                        <h1>
                            POST SUCCESFULLY DELETED
                        </h1>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default SingleAd;
