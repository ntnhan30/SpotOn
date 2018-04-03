/***** ============================
 *
 * This Class takes an array with all the results from an AD and tabulates the, and
 * analyses it to give the score for each KPI of Weighted Top Box.
 *
============================ ******/
var _ = require('lodash');

class CountAnswers {

    init = (results) => {
        let result = [];
        var partitionedByAd = _(results).groupBy('VidDum').values().value();

        // eslint-disable-next-line
        partitionedByAd.map( single => {
            let countanswers = this.countAnswers(single);
            let cleaned = this.cleanOutput(countanswers);
            result.push(cleaned);
        });
        return result;
    }

    // This function counts the different values
    // eslint-disable-next-line
    countAnswers = (arr) => {
        let result = {};
        // eslint-disable-next-line
        arr.map( single => {
            for ( let key in single ) {
                let qKey = key.split("r");
                let k = (qKey.length > 1) ? [qKey[0]] : key ;
                let i = (qKey.length > 1) ? [qKey[1]] : [single[key]] ;

                result[k] = ( result[k] == null ) ? {} : result[k];
                result[k][i] = ( result[k][i] == null ) ? 0 : result[k][i];

                if (((qKey.length === 2) && (single[key] === 1)) || (qKey.length === 1)){
                    result[k][i]++;
                }
            }
            return true;
        });
        return result;
    }

    cleanOutput = single => {
        let result = {};

        const nameOfAd = this.getNameOfAd(single.VidDum);
        result['adName'] = nameOfAd;
        result['toneOfVoice'] = single.Q3;
        result['emotion'] = single.Q4;
        result['sampleSize'] = this.getSampleSize(single.VidDum);

        return result;
    }

    getNameOfAd = (arr) => {
        let result = '';
        for ( let i in arr ) {
            result = i;
        }
        return result;
    }

    getSampleSize = (arr) => {
        let result = '';
        for ( let i in arr ) {
            result = arr[i];
        }
        return result;
    }
}

export default CountAnswers;
