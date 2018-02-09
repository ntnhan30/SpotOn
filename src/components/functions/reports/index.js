class TabulateAnswers {
    constructor() {
        this.results = [];
    }

    init = (results) => {
        this.results = results;

        let result = this.mainKPI( this.kpiCalculation( this.countAnswers() ) );
        return result;
    }

    // This function counts the different values
    countAnswers = () => {
        let result = [];
        this.results.map( single => {
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
        //console.log(result);
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
        result = parseFloat(((count/maxCount)*100));
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
        result = parseFloat(((count/maxCount)*100));
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
                case(10):
                    maxCount += ( arr[i] * 3.5 );
                    break;
                default:
            }
        }

        result = parseFloat(((count/maxCount)*100));
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
            //console.log('i => ' + arr[i] + ' count => ' + count + ' maxCount ' + maxCount);
        }

        result = parseFloat(((count/maxCount)*100));
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

        result = parseFloat(((count/maxCount)*100));
        return result;
    }

    kpiCalculation = (arr) => {
        let result = [];
        for ( let i in arr ) {
            switch(i) {
                case ( 'Q1' ):
                    /*** Binary scale
                    - Brand Recal
                    */
                    result[i] = this.binaryScale(arr[i]);
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
                default:
            }
        }
        //console.log(result);
        return result;
    }

    mainKPI = (arr) => {
        let result = arr;
        result['Brand Relevance'] = ( arr['Q1']* 0.3 ) + ( arr['Q5o2']* 0.4 ) + ( arr['Q8']* 0.3 )
        result['Viewer Engagement'] = ( arr['Q2']* 0.3 ) + ( arr['Q5o3']* 0.4 ) + ( arr['Q6']* 0.3 )
        result['Ad Message'] = ( arr['Q3']* 0.3 ) + ( arr['Q4']* 0.3 ) + ( arr['Q5o1']* 0.2 ) + ( arr['Q7']* 0.2 )
        result['Total'] = ( result['Brand Relevance']* 0.3 ) + ( result['Viewer Engagement']* 0.4 ) + ( result['Ad Message']* 0.3 )

        return result;
    }
}

export default TabulateAnswers;
