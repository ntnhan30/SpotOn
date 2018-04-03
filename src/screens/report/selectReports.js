import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import {
    Api,
    AdList,
    FilterSidebar,
    FilterAds,
    SelectedAds
} from '../../components';
import {
    SingleReport,
    Chart
} from '../../screens';
var _ = require('lodash');

const api = new Api();
const filterAds = new FilterAds();


class SelectReports extends Component {

    constructor() {
        super();
        this.state = {
            ads: [], // this is the list of filtered ads
            filterAtts: [], // this is the list of attributes and values to filter the ads
            selectedAds: []
        };
    }

    static defaultProps = {
        api,
        filterAds
    }

    async componentDidMount() {
        // Retrieve the ads from the server
        const ads = await this.props.api.fetchAds();

        this.setState({
            ads: _.map(ads, o => _.extend({ show: true }, o)) // Show all the ads
        });
    }


    filterThisAds = async ( valueToFilter, key ) => {
        let result = await this.props.filterAds.init( this.state.ads, this.state.filterAtts, valueToFilter, key );

        // save the state with the filters that applied
        this.setState({
            filterAtts: result[0],
            ads: result[1]
        });
    }

    handleSelection = (ad, isSelected) => {
        let currentlySelectedAds = this.state.ads;
        ad['selected'] = isSelected;
        _.map(currentlySelectedAds, function(obj) {
            return _.assign(obj, _.find([ad], {adname: obj.adname}));
        });

        this.setState({
            ads: currentlySelectedAds
        });
    }

    render() {
        // this is all the ads retrieved
        return (
            <div className="container-fluid main">
                <div className="col-2" id="filter">
                    <FilterSidebar ads={this.state.ads} filteredAds={this.state.ads} filterAdlist={this.filterThisAds} />
                </div>

                <div className="col-2" id="selected">
                    <Route
                        key={2}
                        exact={false}
                        path='/'
                        render={ (props) => <SelectedAds ads={this.state.ads} handleSelection={this.handleSelection} {...this.props} {...props} /> }
                    />
                </div>

                <div className="col-8 main-content">
                    <div>
                        <Route
                            key={1}
                            exact={true}
                            path='/weightedReport/:id'
                            render={ (props) => <SingleReport ads={this.state.ads} handleSelection={this.handleSelection} typeOfReport='weighted'  {...this.props} {...props} /> }
                        />

                        <Route
                            key={2}
                            exact={true}
                            path='/percentileReport/:id'
                            render={ (props) => <SingleReport ads={this.state.ads} handleSelection={this.handleSelection} typeOfReport='percentile'  {...this.props} {...props} /> }
                        />

                        <Route
                            key={3}
                            exact={true}
                            path='/chart/:id'
                            render={ (props) => <Chart ads={this.state.ads} handleSelection={this.handleSelection}  {...this.props} {...props} /> }
                        />

                        <Route
                            key={4}
                            exact={true}
                            path='/'
                            render={ (props) => <AdList ads={this.state.ads} handleSelection={this.handleSelection} {...this.props} {...props} /> }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectReports;
