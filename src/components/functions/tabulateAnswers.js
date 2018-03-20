/***** ============================
 *
 * This Class takes an array with all the results from an AD and tabulates the, and
 * analyses it to give the score for each KPI of Weighted Top Box.
 *
============================ ******/
var _ = require('lodash');

class TabulateAnswers {

    init = (results) => {
        let result = [];
        var partitionedByAd = _(results).groupBy('VidDum').values().value();

        // eslint-disable-next-line
        partitionedByAd.map( single => {
            let countanswers = this.countAnswers(single);
            let kpis = this.kpiCalculation(countanswers);
            let mainKpis = this.mainKPI(kpis);
            result.push(mainKpis);
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

                result[k] = ( result[k] == null ) ? [] : result[k];
                result[k][i] = ( result[k][i] == null ) ? 0 : result[k][i];

                if (((qKey.length === 2) && (single[key] === 1)) || (qKey.length === 1)){
                    result[k][i]++;
                }
            }
            return true;
        });
        return result;
    }

    binaryScale = (arr) => {
        let result = 0;
        let count = 0;
        let maxCount = 0;
        for ( let i in arr ) {
            if (parseFloat(i) === 1){
                count += arr[i];
            }
            maxCount += arr[i];
        }
        result = (maxCount > 0 ? parseFloat((count/maxCount)*100) : 0)
        // Invert result
        result = 100 - result;
        return result;
    }

    likertScale = (arr) => {
        let result = 0;
        let count = 0;
        let maxCount = 0;
        for ( let i in arr ) {
            switch(parseFloat(i)) {
                case ( 1 ):
                    count += ( arr[i] * 3.5 );
                    maxCount += ( arr[i] * 3.5 );
                    break;
                case ( 2 ):
                    count += ( arr[i] * 1.5 );
                    maxCount += ( arr[i] * 1.5 );
                    break;
                case ( 4 ):
                    maxCount += ( arr[i] * 1.5 );
                    break;
                case ( 5 ):
                    maxCount += ( arr[i] * 3.5 );
                    break;
                default:
            }
        }
        result = (maxCount > 0 ? parseFloat((count/maxCount)*100) : 0)
        return result;
    }

    messagingCalculation = (arr) => {
        let result = 0;
        let count = 0;
        let maxCount = 0;
        for ( let i in arr ) {
            switch(parseFloat(i)) {
                case(1):
                case(2):
                case(3):
                    count += ( arr[i] * 3.5 );
                    maxCount += ( arr[i] * 3.5 );
                    break;
                case(4):
                case(5):
                case(6):
                    count += ( arr[i] * 1.5 );
                    maxCount += ( arr[i] * 1.5 );
                    break;
                case(7):
                case(8):
                case(9):
                case(98):
                    maxCount += ( arr[i] * 3.5 );
                    break;
                default:
            }
        }
        result = (maxCount > 0 ? parseFloat((count/maxCount)*100) : 0)
        return result;
    }

    toneOfVoiceCalculation = (arr) => {
        let result = 0;
        let count = 0;
        let maxCount = 0;
        for ( let i in arr ) {
            switch(parseFloat(i)) {
                case(1):
                case(2):
                case(3):
                case(4):
                    count += ( arr[i] * 3.5 );
                    maxCount += ( arr[i] * 3.5 );
                    break;
                case(5):
                case(6):
                case(7):
                case(8):
                    count += ( arr[i] * 1.5 );
                    maxCount += ( arr[i] * 1.5 );
                    break;
                case(9):
                case(10):
                case(11):
                case(12):
                    maxCount += ( arr[i] * 1.5 );
                    break;
                case(13):
                case(14):
                case(15):
                case(16):
                    maxCount += ( arr[i] * 3.5 );
                    break;
                default:
            }
        }
        result = (maxCount > 0 ? parseFloat((count/maxCount)*100) : 0)
        return result;
    }

    emotionCalculation = (arr) => {
        let result = 0;
        let count = 0;
        let maxCount = 0;
        for ( let i in arr ) {
            switch(parseFloat(i)) {
                case(1):
                case(2):
                case(3):
                    count += ( arr[i] * 3.5 );
                    maxCount += ( arr[i] * 3.5 );
                    break;
                case(4):
                case(5):
                case(6):
                    count += ( arr[i] * 1.5 );
                    maxCount += ( arr[i] * 1.5 );
                    break;
                case(7):
                case(8):
                case(9):
                    maxCount += ( arr[i] * 1.5 );
                    break;
                case(10):
                case(11):
                case(12):
                    maxCount += ( arr[i] * 3.5 );
                    break;
                default:
            }
        }
        result = (maxCount > 0 ? parseFloat((count/maxCount)*100) : 0)
        return result;
    }

    getNameOfAd = (arr) => {
        let result = '';
        for ( let i in arr ) {
            result = i;
        }
        return result;
    }

    kpiCalculation = (arr) => {
        let result = {};
        for ( let i in arr ) {
            switch(i) {
                case ( 'Q1o2' ):
                    /*** Binary scale
                    - Brand Recal
                    */
                    result['Q1'] = this.binaryScale(arr[i]);
                    break;
                case ( 'Q2' ):
                case ( 'Q5o1' ): case ( 'Q5o2' ): case ( 'Q5o3' ):
                case ( 'Q6' ):
                case ( 'Q8' ):
                    /*** Likert Scale
                    - Ad appeal
                        - Uniqueness
                        - Relevance
                        - Shareability
                    - Call to action
                    - Brand fit
                    */
                    result[i] = this.likertScale(arr[i]);
                    break;
                case ('Q3'):
                    /*** Tone of voice
                    */
                    result[i] = this.toneOfVoiceCalculation(arr[i]);
                    break;
                case ('Q4'):
                    /*** Emotion
                    */
                    result[i] = this.emotionCalculation(arr[i]);
                    break;
                case ('Q7'):
                    /*** MessagingCalculation
                    */
                    result[[i]] = this.messagingCalculation(arr[i]);
                    break;
                case ('VidDum'):
                    result['Ad name'] = this.getNameOfAd(arr[i]);
                    break;
                default:
            }
        }
        return result;
    }

    mainKPI = (arr) => {
        let result = arr;

        result['Brand Relevance'] = ( parseFloat(arr['Q1'])* 0.3 ) + ( parseFloat(arr['Q5o2'])* 0.4 ) + ( parseFloat(arr['Q8'])* 0.3 )
        result['Viewer Engagement'] = ( parseFloat(arr['Q2'])* 0.3 ) + ( parseFloat(arr['Q5o3'])* 0.4 ) + ( parseFloat(arr['Q6'])* 0.3 )
        result['Ad Message'] = ( parseFloat(arr['Q3'])* 0.3 ) + ( parseFloat(arr['Q4'])* 0.3 ) + ( parseFloat(arr['Q5o1'])* 0.2 ) + ( parseFloat(arr['Q7'])* 0.2 )
        result['Total'] = ( parseFloat(result['Brand Relevance'])* 0.3 ) + ( parseFloat(result['Viewer Engagement'])* 0.4 ) + ( parseFloat(result['Ad Message'])* 0.3 )

        return result;
    }
}

export default TabulateAnswers;
