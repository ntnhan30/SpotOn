import React, { Component, Fragment } from 'react';
import { Api } from '../../constants';
import ThumbAd from'../../Assets/imgs/ad-thumb.jpg';
import HeroImageAd from'../../Assets/imgs/ad-heroimage.png';


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

            var heroStyle = {
                backgroundImage: `url(${HeroImageAd})`
            };

            return (
                <Fragment>
                    <div className="container-fluid hero-image" style={ heroStyle }>
                        <div className="col-5 offset-2">
                            <span onClick={this.downloadAd}>
                                DOWNLOAD
                            </span>
                            <span onClick={this.reimportAd}>
                                REIMPORT
                            </span>
                            <span onClick={this.deleteSingleAd}>
                                DELETE
                            </span>
                            <h1>
                                {this.state.thisAd.adname}
                            </h1>
                            <p>McDonalds - if you're looking for an ad about burgers from McDonalds - this ad is for you.</p>
                        </div>
                    </div>

                    <div className="container-fluid single">
                        <div className="col-5 offset-2">
                            <p>This TVC is a great place to start if you've never eaten burgers before. We'll provide an overview of the ingredients, go over the basic building blocks, and offer suggestions and best practices for eating a burger. And if you're new to the world of fries too, there's plenty of lessons covering the basics of potatoes and salt to help you get up and running.</p>
                        </div>

                        <div className="col-3 move-up offset-1">
                            <a href={this.state.thisAd.videourl} target="_blank">
                                <img  src={ThumbAd} alt="Upload Ads"/>
                            </a>
                            <table className="">
                                <tbody>
                                    <tr>
                                        <td>Title</td>
                                        <td>{this.state.thisAd.shortname}</td>
                                    </tr>
                                    <tr>
                                        <td>Brand</td>
                                        <td>{this.state.thisAd.brand}</td>
                                    </tr>
                                    <tr>
                                        <td>Industry</td>
                                        <td>{this.state.thisAd.industry}</td>
                                    </tr>
                                    <tr>
                                        <td>Length</td>
                                        <td>{this.state.thisAd.lengthAd}"</td>
                                    </tr>
                                    <tr>
                                        <td>Channel</td>
                                        <td>{this.state.thisAd.channel}</td>
                                    </tr>
                                    <tr>
                                        <td>State</td>
                                        <td>{this.state.thisAd.productionState}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Fragment>
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
