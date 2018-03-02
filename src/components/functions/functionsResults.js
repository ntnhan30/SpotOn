/***** ============================
 *
 * This Class takes an array with all the results from an AD and tabulates the, and
 * analyses it to give the score for each KPI of Weighted Top Box.
 *
============================ ******/
import { Api } from '../../constants';
var _ = require('lodash');

const api = new Api();

class FunctionsResults {
    constructor() {
        this.api = api;
    }

    getGlobalAverage = async () => {
        // create empty object
        let allKPIs = await this.api.fetchKPIs();
        let averageKPIs = [];

        // Get the average of every key and assign to avergaeKPIs
        for (let key in allKPIs['0']){
            let byKey = _.mapValues(allKPIs, function(o) { return o[key]; });
            byKey =_.mean(_.values(byKey));
            averageKPIs[key] = byKey;
        };

        return averageKPIs;
    }

    getGlobalRange = (KPIs) => {
        let result = [];

        let maxPercentile = KPIs[0];
        let minPercentile = KPIs[1];

        // for each kpi
        for (let single in KPIs){
            // For each value inside KPI
            for (let key in KPIs[single]){
                // Get maximum
                maxPercentile[key] = ( KPIs[single][key] > maxPercentile[key] )  ? KPIs[single][key] : maxPercentile[key] ;
                // Get minimum
                minPercentile[key] = ( KPIs[single][key] < minPercentile[key] )  ? KPIs[single][key] : minPercentile[key] ;
            }
        }

        result.maxPercentile = maxPercentile;
        result.minPercentile = minPercentile;
        return (result);
    }

    getAverageKPIsOfSelected = (selectedAds) => {
        // create empty object
        let allKPIs = [];
        let averageKPIs = [];

        // Asign only the KPI objects into the allKPIs array
        _.mapValues(selectedAds, function (single) {
            allKPIs.push(single.kpis);
        })

        // Get the average of every key and assign to avergaeKPIs
        for (let key in allKPIs['0']){
            let byKey = _.mapValues(allKPIs, function(o) { return o[key]; });
            byKey =_.mean(_.values(byKey));
            averageKPIs[key] = byKey;
        };

        return averageKPIs;
    }

    getPercentileScore = async (selectedAds) => {
        // Retrieve all KPIs from the server
        let allKPIs = await this.api.fetchKPIs();

        console.log('allKPIs');
        console.log(allKPIs);

        // Sort the values of every KPI
        let sorted = [];
        const sortNumber = (a,b) => { return a - b; }
        for (let singleKPI in allKPIs['0']){
            sorted[singleKPI] = _.map(allKPIs, singleKPI).sort(sortNumber);
        };

        // Count duplicates
        let counted = [];
        for (let s in sorted){
            var  count = {};
            // eslint-disable-next-line
            sorted[s].forEach(function(i) { count[i] = (count[i]||0) + 1;});
            counted[s] = count;
        }
        console.log('sorted');
        console.log(sorted);
        console.log('counted');
        console.log(counted);
        console.log('selectedAds');
        console.log(selectedAds);

        // For each ad selected
        for (let single in selectedAds){
            // Generate an empty object for the percentile values
            selectedAds[single]['percentile'] = {};
            // For KPI of the selected Ad
            for (let kpi in selectedAds[single].kpis){
                let value = selectedAds[single].kpis[kpi]; // Get value
                let index = sorted[kpi].indexOf(selectedAds[single].kpis[kpi]) // Get first position in the sorted array
                let duplicates = (counted[kpi][value]);   // Get the number of duplicates
                let position = index + (duplicates/2);  // Get the final position in the sorted array
                let percentile = (position/allKPIs.length)*100; // Get the percentile value based on the position divided by the amount of Ads.
                // push the percentile values into the selectedAds
                selectedAds[single]['percentile'][kpi] = percentile;
            }
        }

        // Get the average percentile -----

        // create empty object
        let allPercentileValues = [];
        let averagePercentiles = {};

        // Asign only the KPI objects into the allKPIs array
        _.mapValues(selectedAds, function (single) {
            allPercentileValues.push(single.percentile);
        })

        // Get the average of every key and assign to avergaeKPIs
        for (let key in allPercentileValues['0']){
            let byKey = _.mapValues(allPercentileValues, function(o) { return o[key]; });
            byKey =_.mean(_.values(byKey));
            averagePercentiles[key] = byKey;
        };

        //return the selected Ads and Average Percentiles;
        let result = {};
        result.selectedAds = selectedAds;
        result.average = averagePercentiles;
        return (result);
    };
}

export default FunctionsResults;
