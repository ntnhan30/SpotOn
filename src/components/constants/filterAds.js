/***** ============================
 * This Class takes the original set of ads and adds a new column called "show"
 * If its true it will show on the Adlist, otherwise it will be hidden.
 *
 * This Filter works concatenating the filters applied by the user, which can be
 * Multiselect
 * Date Range
 * Number Range
 * Dropdown
============================ ******/

var _ = require('lodash');

class FilterAds {
    constructor() {
        this.ads = [];
        this.filterAtts = [];
    }
    // valueToFilter - is an array of the selected values
    // key is a string with the name of the attr

    // copy the state
    async init(ads, filterAtts, valueToFilter, key) {
        this.ads = ads;
        this.filterAtts = filterAtts;


        let tempFilt = this.filterAtts;
        // add the new value
        tempFilt[key] = valueToFilter;


        const isInsideDateRange = (date, range) => {
            if (date === null) {
                // If the Ad doesn't have a date
                const thisYear = (new Date()).getFullYear().toString().substr(-2);
                const thisMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
                date = thisYear + '/' + thisMonth;
                //console.log(date);
            }
            date = date.split("/");
            let isInside;

            date[0] = parseInt('20' + date[0], 10)

            if ( date[0] > range.from.year ){
                // is more than minimum year
                if ( date[0] < range.to.year ){
                    // is less than maximum year
                    isInside = true;
                } else if ( date[0] === range.to.year ){
                    // is the same as maxium year
                    isInside = ( date[1] <= range.to.month ) ? true : false; // maximum month is equal or more
                } else {
                    isInside = false;
                }
            } else if ( date[0] === range.from.year ){
                // is the same as minimum year
                isInside = ( date[1] >= range.from.month ) ? true : false; // minimum month is equal or more
            }  else {
                isInside = false;
            }
            return isInside;

        }

        const isInsideLengthRange = (length, range) => {
            length = parseInt(length, 10);
            return ( (length >= range['min'] && length <= range['max']) ? true : false );
        }


        const filterList = (ad, filterKey, single) => {
            switch (filterKey) {
                case 'brand':
                case 'industry':
                case 'country':
                case 'format':
                case 'channel':
                case 'productionState':
                case 'state':
                    return ad[filterKey] === single;
                case 'lengthAd':
                    return isInsideLengthRange(ad.lengthAd, single);
                case 'campaigndate':
                    return isInsideDateRange(ad.campaigndate, single);
                default:
                    break;
            }
        }

        let filteredAds = [];
        let filterEmpty = true;
        let stopFitering = false;

        for (var filterKey in tempFilt) {
            // just if it is something inside

            if (tempFilt[filterKey].length > 0 && !stopFitering){
                // Loop through the filters
                let keyFilteredAds = [];
                filterEmpty = false;

                for(let att in tempFilt[filterKey]) {
                    // Loop through the filters of each attr
                    // eslint-disable-next-line
                    let ff = this.ads.filter( (i) => filterList(i, filterKey, tempFilt[filterKey][att]) );
                    keyFilteredAds = _.union(keyFilteredAds, ff);
                }

                if ( ( filteredAds && filteredAds.length > 0 ) && ( keyFilteredAds && keyFilteredAds.length > 0 ) )   {
                    filteredAds = _.intersectionBy(keyFilteredAds, filteredAds, 'adname');
                    stopFitering = (!(filteredAds.length > 0)) ? true : false;
                } else {
                    filteredAds = keyFilteredAds;
                    filteredAds = (!(keyFilteredAds.length > 0)) ? this.ads : keyFilteredAds;
                }
            }
        }

        // If there are no filters applied, restart the ads
        filteredAds = filterEmpty ? this.ads : filteredAds;

        this.filterAtts = tempFilt;

        // Restart the array - hide all the ads
        _.forEach(this.ads, function(v, key) {
            v.show = false;
        });
        // Change the Show Value of the Filtered Ads
        _.forEach(filteredAds, function(v, key) {
            v.show = true;
        });

        // Merge the two arrays
        _.map(this.ads, function(obj) {
            return _.assign(obj, _.find(filteredAds, { adname: obj.adname }));
        });

        // Set up the array to return
        const result = [
            this.filterAtts,
            this.ads
        ];

        return (result);
    }
}

export default FilterAds;
