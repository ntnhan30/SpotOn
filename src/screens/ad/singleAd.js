import React, { Component } from 'react';
import { Api } from '../../constants/api';

const api = new Api();

class SingleAd extends Component {
    constructor() {
        super();
        this.state = {
            thisAd: [], // this is the list of filtered ads
        };
    }

    static defaultProps = {
        api
    }

    async componentDidMount() {
        // Retrieve the ad from the server
        const thisAd = await this.props.api.fetchFingleAd(this.props.match.params.id);
        this.setState({
            thisAd: thisAd[0],
        });
    }

    render() {
        if(this.props.match !== undefined && this.props.match.params !== undefined ){
            return (
                <div className="container-fluid">
                    <div>
                        <table style={{border: '1px solid black'}}>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>Industry</td>
                                </tr>
                                <tr>
                                    <td>{this.state.thisAd.shortname}</td>
                                    <td>{this.state.thisAd.industry}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default SingleAd;
