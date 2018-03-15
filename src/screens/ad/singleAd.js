import React, { Component, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Api } from '../../constants';
import {
    HorizontalChart,
    GetKPIs,
    LoadingSpinner,
    CircleProgress
} from '../../components';
import ThumbAd from'../../Assets/imgs/ad-thumb.jpg';
import HeroImageAd from'../../Assets/imgs/ad-heroimage.png';
var _ = require('lodash');

const api = new Api();
const getKPIs = new GetKPIs();

class SingleAd extends Component {
    constructor() {
        super();
        this.state = {
            thisAd: [], // this is the list of filtered ads
            adStillExist: true
        };
    }

    static defaultProps = {
        api,
        getKPIs
    }

    componentDidMount = async () => {
        // Get the adname of this Ad
        const adname = this.props.match.params.id;

        // Retrieve the ad details from the server
        const thisAd = await this.props.api.fetchSingleAd(adname);

        // Save them into the state
        this.setState({
            thisAd
            //thisKPIs: thisAd.kpis
        });
    }

    deleteSingleAd = async () => {
        // Retrieve the ad details from the server
        const didItDelete = await this.props.api.deleteAd(this.state.thisAd.ad.adname);

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

    breakByBR = (text) => {
        let result = text.split('<br/>').map((item, key) => {
            return <p key={key}>{item}</p>
        })
        return result;
    }

    render() {
        const thisAd = this.state.thisAd;
        const brandRelevance = [ 'Brand Recall', 'Relevance', 'Brand Fit' ];
        const viewerEngagement = [ 'Ad Appeal', 'Shareability', 'Call to action' ];
        const adMessage = [ 'Messaging', 'Tone of voice', 'Emotion', 'Uniqueness' ];

        console.log(thisAd);


        if (!this.state.adStillExist) {
            return (
                <div className="container-fluid">
                    <div className="col-md-8 offset-md-2">
                        <h1>
                            POST SUCCESFULLY DELETED
                        </h1>
                    </div>
                </div>
            );
        } else if( !_.isEmpty(thisAd) ){

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
                                {thisAd.ad.adname}
                            </h1>
                            {this.breakByBR(thisAd.ad.mainMessage)}
                        </div>
                    </div>

                    <div className="container-fluid single">
                        <div className="col-5 offset-2">
                            <p>{thisAd.ad.summary}</p>
                        </div>

                        <div className="col-3 move-up offset-1">
                            <a href={thisAd.ad.videourl} target="_blank">
                                <img  src={ThumbAd} alt="Upload Ads"/>
                            </a>
                            <table className="">
                                <tbody>
                                    <tr>
                                        <td>Title</td>
                                        <td>{thisAd.ad.shortname}</td>
                                    </tr>
                                    <tr>
                                        <td>Brand</td>
                                        <td>{thisAd.ad.brand}</td>
                                    </tr>
                                    <tr>
                                        <td>Industry</td>
                                        <td>{thisAd.ad.industry}</td>
                                    </tr>
                                    <tr>
                                        <td>Length</td>
                                        <td>{thisAd.ad.lengthAd}"</td>
                                    </tr>
                                    <tr>
                                        <td>Channel</td>
                                        <td>{thisAd.ad.channel}</td>
                                    </tr>
                                    <tr>
                                        <td>State</td>
                                        <td>{thisAd.ad.productionState}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="container-fluid single">
                        <div className="col-9 offset-2">
                            <Tabs>
                                <TabList>
                                    <Tab>
                                        <div className="col-3">
                                            <CircleProgress value={Math.round(thisAd.kpis.total)} size={'big'} name={'SpotOn score'} />
                                        </div>
                                    </Tab>
                                    <Tab>
                                        <div className="col-2">
                                            <CircleProgress value={Math.round(thisAd.kpis.brandRelevance)} size={'medium'} name={'Brand Relevance'}/>
                                        </div>
                                    </Tab>
                                    <Tab>
                                        <div className="col-2">
                                            <CircleProgress value={Math.round(thisAd.kpis.viewerEngagement)} size={'medium'} name={'Viewer Engagement'}/>
                                        </div>
                                    </Tab>
                                    <Tab>
                                        <div className="col-2">
                                            <CircleProgress value={Math.round(thisAd.kpis.adMessage)} size={'medium'} name={'Ad Message'}/>
                                        </div>
                                    </Tab>
                                </TabList>

                                <TabPanel>

                                </TabPanel>
                                <TabPanel>
                                    <HorizontalChart thisResults={[thisAd]} kpis={this.props.getKPIs.init(brandRelevance)}/>
                                </TabPanel>
                                <TabPanel>
                                    <HorizontalChart thisResults={[thisAd]} kpis={this.props.getKPIs.init(viewerEngagement)}/>
                                </TabPanel>
                                <TabPanel>
                                    <HorizontalChart thisResults={[thisAd]} kpis={this.props.getKPIs.init(adMessage)}/>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return <LoadingSpinner/>;
        }
    }
}

export default SingleAd;
