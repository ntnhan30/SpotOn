var _ = require('lodash');

class FilterAds {
    constructor() {
        this.originalAds = [];
        this.ads = [];
        this.filterAtts = [];
    }
    // valueToFilter - is an array of the selected values
    // key is a string with the name of the attr

    // copy the state
    async init(originalAds, ads, filterAtts, valueToFilter, key) {

        this.originalAds = originalAds;
        this.ads = ads;
        this.filterAtts = filterAtts;


        let tempFilt = this.filterAtts;
        // add the new value
        tempFilt[key] = valueToFilter;


        const isInsideDateRange = (date, range) => {
            date = date.split("/");
            let isInside;

            if ( date[0] > range['from']['year'].toString().slice(-2) ){
                // is more than minimum year
                if ( date[0] < range['to']['year'].toString().slice(-2) ){
                    // is less than maximum year
                    isInside = true;
                } else if ( date[0] === range['to']['year'].toString().slice(-2) ){
                    // is the same as maxium year
                    if ( date[1] <= range['to']['month'] ){
                        // maximum month is equal or more
                        isInside = true;
                    } else {
                        isInside = false;
                    }
                } else {
                    isInside = false;
                }
            } else if ( date[0] === range['from']['year'].toString().slice(-2) ){
                // is the same as minimum year
                if ( date[1] >= range['from']['month'] ){
                    // minimum month is equal or more
                    isInside = true;
                } else {
                    isInside = false;
                }
            }  else {
                isInside = false;
            }
            return isInside;
        }

        const isInsideLengthRange = (length, range) => {
            length = parseInt(length, 10);

            if (length >= range['min'] && length <= range['max']){
                return true;
            } else {
                return false;
            }
        }


        const filterList = (ad, filterKey, single) => {
            switch (filterKey) {
                case 'brand':
                    return ad.brand === single;
                case 'industry':
                    return ad.industry === single;
                case 'country':
                    return ad.country === single;
                case 'format':
                    return ad.format === single;
                case 'lengthAd':
                    return isInsideLengthRange(ad.lengthAd, single);
                case 'channel':
                    return ad.channel === single;
                case 'productionState':
                    return ad.productionState === single;
                case 'state':
                    return ad.state === single;
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
                    let ff = this.originalAds.filter( (i) => filterList(i, filterKey, tempFilt[filterKey][att]) );
                    keyFilteredAds = _.union(keyFilteredAds, ff);
                }

                if ( ( filteredAds && filteredAds.length > 0 ) && ( keyFilteredAds && keyFilteredAds.length > 0 ) )   {
                    filteredAds = _.intersectionBy(keyFilteredAds, filteredAds, 'adname');
                    if (!(filteredAds.length > 0)){
                        stopFitering = true;
                    }
                } else {
                    filteredAds = keyFilteredAds;
                    if (!(filteredAds.length > 0)){
                        filteredAds = this.originalAds;
                    }
                }
            }
        }

        if (filterEmpty){
            filteredAds = this.originalAds;
        }

        this.filterAtts = tempFilt;
        this.ads = filteredAds;

        const result = [
            this.filterAtts,
            this.ads
        ];

        return (result);
    }
}

export default FilterAds;
